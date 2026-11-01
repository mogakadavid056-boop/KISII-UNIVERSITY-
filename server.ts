import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = import.meta.dirname;
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

const REA_DIR = path.resolve(__dirname, 'rea');
const SAMPLES_DIR = path.resolve(__dirname, 'samples');
const CATALOG_PATH = path.join(REA_DIR, 'dist', 'mcp-catalog-full.json');

// Cache catalog in memory
let cachedCatalog: any = null;
function getCatalog() {
  if (cachedCatalog) return cachedCatalog;
  try {
    if (fs.existsSync(CATALOG_PATH)) {
      const data = fs.readFileSync(CATALOG_PATH, 'utf-8');
      cachedCatalog = JSON.parse(data);
      return cachedCatalog;
    }
  } catch (err) {
    console.error('Failed to read REA catalog:', err);
  }
  return null;
}

// Map tools to categories
function categorizeTool(toolName: string): string {
  const name = toolName.toLowerCase();
  if (name.includes('elf') || name.includes('pe') || name.includes('mach_o') || name.includes('macho') ||
      name.includes('hopper') || name.includes('ghidra') || name.includes('cutter') || name.includes('rizin') ||
      name.includes('gdb') || name.includes('decompile') || name.includes('disassemble') || name.includes('instruction') ||
      name.includes('native') || name.includes('dylib') || name.includes('swift')) {
    return 'Binary & Native';
  }
  if (name.includes('javascript') || name.includes('web') || name.includes('bundle') || name.includes('source_map') ||
      name.includes('route') || name.includes('electron') || name.includes('ast')) {
    return 'JavaScript & Web';
  }
  if (name.includes('adb') || name.includes('android') || name.includes('apk') || name.includes('dex') ||
      name.includes('jadx') || name.includes('jeb') || name.includes('harmony')) {
    return 'Android & Mobile';
  }
  if (name.includes('pcap') || name.includes('har') || name.includes('traffic') || name.includes('mitm') ||
      name.includes('network') || name.includes('http3')) {
    return 'Network & Traffic';
  }
  if (name.includes('esp') || name.includes('devicetree') || name.includes('hex') || name.includes('uimage') ||
      name.includes('uf2') || name.includes('sigrok') || name.includes('firmware') || name.includes('fit_image')) {
    return 'Hardware & Firmware';
  }
  if (name.includes('unity') || name.includes('godot') || name.includes('il2cpp') || name.includes('wasm') ||
      name.includes('beam') || name.includes('evm') || name.includes('dotnet') || name.includes('managed')) {
    return 'Engines & VMs';
  }
  if (name.includes('frida') || name.includes('lldb') || name.includes('process') || name.includes('trace') ||
      name.includes('observe')) {
    return 'Tracing & Runtime';
  }
  return 'MCP & System';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '20mb' }));

  // Status API
  app.get('/api/status', async (_req, res) => {
    try {
      const catalog = getCatalog();
      let doctorOutput = '';
      let isHealthy = false;

      try {
        const { stdout } = await execAsync('rea mcp doctor', { timeout: 6000 });
        doctorOutput = stdout;
        isHealthy = stdout.includes('healthy: true');
      } catch (err: any) {
        doctorOutput = err?.stdout || err?.message || 'Error running doctor';
      }

      res.json({
        healthy: isHealthy,
        version: '6.8.0',
        mcpVersion: '2025-11-25',
        reaPath: REA_DIR,
        globalBinary: '/usr/local/bin/rea',
        totalTools: catalog?.tools?.length || 234,
        totalPrompts: catalog?.prompts?.length || 6,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        doctor: doctorOutput,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Tools catalog API
  app.get('/api/tools', (req, res) => {
    try {
      const catalog = getCatalog();
      if (!catalog) {
        return res.status(500).json({ error: 'Tool catalog not available' });
      }

      const categoryFilter = (req.query.category as string) || '';
      const queryFilter = (req.query.q as string || '').toLowerCase();

      const enrichedTools = catalog.tools.map((tool: any) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
        category: categorizeTool(tool.name),
      }));

      let filtered = enrichedTools;
      if (categoryFilter && categoryFilter !== 'All') {
        filtered = filtered.filter((t: any) => t.category === categoryFilter);
      }
      if (queryFilter) {
        filtered = filtered.filter((t: any) =>
          t.name.toLowerCase().includes(queryFilter) ||
          (t.description && t.description.toLowerCase().includes(queryFilter))
        );
      }

      const categories = ['All', 'Binary & Native', 'JavaScript & Web', 'Android & Mobile', 'Network & Traffic', 'Hardware & Firmware', 'Engines & VMs', 'Tracing & Runtime', 'MCP & System'];

      res.json({
        total: catalog.tools.length,
        filteredCount: filtered.length,
        categories,
        tools: filtered,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Prompts catalog API
  app.get('/api/prompts', (_req, res) => {
    try {
      const catalog = getCatalog();
      res.json({
        total: catalog?.prompts?.length || 0,
        prompts: catalog?.prompts || [],
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Samples API
  app.get('/api/samples', (_req, res) => {
    try {
      const samples = [
        {
          id: 'sample_bundle',
          name: 'sample_bundle.js',
          path: path.join(SAMPLES_DIR, 'sample_bundle.js'),
          type: 'JavaScript / Webpack Bundle',
          sizeBytes: fs.existsSync(path.join(SAMPLES_DIR, 'sample_bundle.js')) ? fs.statSync(path.join(SAMPLES_DIR, 'sample_bundle.js')).size : 0,
          description: 'Webpack-packaged JS bundle with embedded auth modules, token generators, and internal telemetry endpoint.',
          recommendedCommands: [
            'rea inspect-artifact samples/sample_bundle.js',
            'rea analyze samples/sample_bundle.js'
          ]
        },
        {
          id: 'sample_app',
          name: 'sample_app (directory)',
          path: path.join(SAMPLES_DIR, 'sample_app'),
          type: 'JavaScript Application Directory',
          sizeBytes: 0,
          description: 'Local JavaScript/Node application workspace with package manifest, source modules, and route dependencies.',
          recommendedCommands: [
            'rea analyze-javascript-application samples/sample_app',
            'rea inspect-artifact samples/sample_app'
          ]
        },
        {
          id: 'sample_echo',
          name: 'sample_echo.elf',
          path: path.join(SAMPLES_DIR, 'sample_echo.elf'),
          type: 'Linux ELF x86_64 Binary',
          sizeBytes: fs.existsSync(path.join(SAMPLES_DIR, 'sample_echo.elf')) ? fs.statSync(path.join(SAMPLES_DIR, 'sample_echo.elf')).size : 0,
          description: 'Standard Linux ELF 64-bit shared object executable with GNU notes, program headers, and ABI tags.',
          recommendedCommands: [
            'rea inspect-elf-notes samples/sample_echo.elf',
            'rea inspect-artifact samples/sample_echo.elf'
          ]
        },
        {
          id: 'sample_network',
          name: 'sample_network.har',
          path: path.join(SAMPLES_DIR, 'sample_network.har'),
          type: 'HTTP Archive (HAR)',
          sizeBytes: fs.existsSync(path.join(SAMPLES_DIR, 'sample_network.har')) ? fs.statSync(path.join(SAMPLES_DIR, 'sample_network.har')).size : 0,
          description: 'HTTP Archive capturing authenticated API negotiation, Bearer token responses, and custom headers.',
          recommendedCommands: [
            'rea inspect-artifact samples/sample_network.har'
          ]
        }
      ];

      res.json({ samples });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Sample file content preview
  app.get('/api/samples/:id/content', (req, res) => {
    try {
      const { id } = req.params;
      let targetFile = '';
      if (id === 'sample_bundle') targetFile = path.join(SAMPLES_DIR, 'sample_bundle.js');
      else if (id === 'sample_network') targetFile = path.join(SAMPLES_DIR, 'sample_network.har');
      else if (id === 'sample_echo') targetFile = path.join(SAMPLES_DIR, 'sample_echo.elf');
      else if (id === 'sample_app') targetFile = path.join(SAMPLES_DIR, 'sample_app', 'package.json');

      if (!targetFile || !fs.existsSync(targetFile)) {
        return res.status(404).json({ error: 'Sample not found' });
      }

      if (id === 'sample_echo') {
        const buf = fs.readFileSync(targetFile);
        return res.json({
          isBinary: true,
          hexSnippet: buf.subarray(0, 256).toString('hex').match(/.{1,2}/g)?.join(' '),
          size: buf.length
        });
      }

      const text = fs.readFileSync(targetFile, 'utf-8');
      res.json({ isBinary: false, content: text, size: text.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // CLI execution endpoint
  app.post('/api/cli/execute', async (req, res) => {
    const { command } = req.body;
    if (!command || typeof command !== 'string') {
      return res.status(400).json({ error: 'Command string is required' });
    }

    let safeCommand = command.trim();
    if (!safeCommand.startsWith('rea')) {
      safeCommand = `rea ${safeCommand}`;
    }

    const startTime = Date.now();
    try {
      const { stdout, stderr } = await execAsync(safeCommand, {
        cwd: __dirname,
        timeout: 30000,
        maxBuffer: 10 * 1024 * 1024,
      });

      res.json({
        ok: true,
        exitCode: 0,
        stdout,
        stderr,
        durationMs: Date.now() - startTime,
      });
    } catch (error: any) {
      res.json({
        ok: false,
        exitCode: error.code || 1,
        stdout: error.stdout || '',
        stderr: error.stderr || error.message || 'Execution error',
        durationMs: Date.now() - startTime,
      });
    }
  });

  // Direct MCP JSON-RPC 2.0 handler
  app.post('/api/mcp/jsonrpc', async (req, res) => {
    const { jsonrpc, id, method, params } = req.body;
    if (jsonrpc !== '2.0') {
      return res.status(400).json({ jsonrpc: '2.0', id: id || null, error: { code: -32600, message: 'Invalid Request: jsonrpc must be 2.0' } });
    }

    try {
      const catalog = getCatalog();

      if (method === 'initialize') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2025-11-25',
            capabilities: {
              tools: { listChanged: false },
              prompts: { listChanged: false },
              resources: { subscribe: false, listChanged: false }
            },
            serverInfo: {
              name: 'io.github.morluto/rea',
              version: '6.8.0'
            },
            instructions: catalog?.instructions || 'REA Reverse Engineering Anything server.'
          }
        });
      }

      if (method === 'tools/list') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            tools: catalog?.tools || []
          }
        });
      }

      if (method === 'prompts/list') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            prompts: catalog?.prompts || []
          }
        });
      }

      if (method === 'ping') {
        return res.json({ jsonrpc: '2.0', id, result: {} });
      }

      if (method === 'tools/call') {
        const { name, arguments: toolArgs } = params || {};
        if (!name) {
          return res.status(400).json({ jsonrpc: '2.0', id, error: { code: -32602, message: 'Missing tool name in params' } });
        }

        const cliName = name.replace(/_/g, '-');
        const cliArgs: string[] = [];

        if (toolArgs && typeof toolArgs === 'object') {
          for (const [k, v] of Object.entries(toolArgs)) {
            if (v === true) {
              cliArgs.push(`--${k.replace(/_/g, '-')}`);
            } else if (v !== false && v !== null && v !== undefined) {
              if (k === 'path' || k === 'input_path') {
                cliArgs.push(String(v));
              } else {
                cliArgs.push(`--${k.replace(/_/g, '-')}`, String(v));
              }
            }
          }
        }

        const fullCmd = `rea ${cliName} ${cliArgs.join(' ')}`;
        try {
          const { stdout, stderr } = await execAsync(fullCmd, { cwd: __dirname, timeout: 20000 });
          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: stdout || stderr || 'Command completed with no output'
                }
              ],
              isError: false
            }
          });
        } catch (execErr: any) {
          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: execErr.stdout || execErr.stderr || execErr.message
                }
              ],
              isError: true
            }
          });
        }
      }

      return res.status(404).json({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` }
      });
    } catch (err: any) {
      return res.status(500).json({
        jsonrpc: '2.0',
        id,
        error: { code: -32603, message: err.message || 'Internal error' }
      });
    }
  });

  // Client configuration snippets
  app.get('/api/mcp/configs', (_req, res) => {
    const claudeDesktop = {
      mcpServers: {
        rea: {
          command: "rea",
          args: ["--mcp"]
        }
      }
    };

    const cursor = {
      mcpServers: {
        "rea-agents": {
          command: "rea",
          args: ["--mcp"]
        }
      }
    };

    const vscodeSettings = {
      "mcp.servers": {
        "rea": {
          "type": "stdio",
          "command": "rea",
          "args": ["--mcp"]
        }
      }
    };

    const goose = {
      extensions: {
        rea: {
          cmd: "rea",
          args: ["--mcp"],
          type: "stdio"
        }
      }
    };

    res.json({
      claudeDesktop,
      cursor,
      vscodeSettings,
      goose
    });
  });

  // Frontend integration: Vite middleware in dev, dist in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`REA Studio & MCP Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start REA Workbench Server:', err);
  process.exit(1);
});
