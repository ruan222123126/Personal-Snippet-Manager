# devenv.nix
{ pkgs, lib, config, inputs, ... }:

{
  # 1. 语言环境保持不变
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    npm.enable = true;        
  };

  # 2. 系统级依赖
  packages = [
    pkgs.openssl
    pkgs.python311Packages.pip
    pkgs.moon
    pkgs.proto
    pkgs.prisma-engines # ✅ 明确加入这个包
  ];

  # 3. 环境变量注入：强制进入“二进制主权模式”
  env = {
    MOON_SKIP_PROTO_INSTALL = "true";
    MOON_NO_PROTO = "true";
    PROTO_OFFLINE = "true";

    # --- 关键：强制 Prisma 丢弃 Library 模式，改用 Binary 模式 ---
    PRISMA_CLI_QUERY_ENGINE_TYPE = "binary";
    PRISMA_CLIENT_ENGINE_TYPE = "binary";

    # 直接指向二进制文件，不再寻找 .node 或 .so
    PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
    PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  };

  # 4. 启动欢迎语与路径验证
  enterShell = ''
    echo "🦁 2026 Sovereign Stack: Environment Loaded (Solid Mode)."
    
    # --- 动态寻找真正的 Prisma 引擎文件 ---
    # 有些 Nix 版本放在 lib/libquery_engine.node，有些是 .so
    REAL_ENGINE_PATH=$(find ${pkgs.prisma-engines} -name "libquery_engine*" | head -n 1)
    export PRISMA_QUERY_ENGINE_LIBRARY="$REAL_ENGINE_PATH"
    
    echo "Node version:   $(node --version)"
    echo "Moon Path:      $(which moon)"
    echo "Prisma Engine:  $PRISMA_QUERY_ENGINE_LIBRARY"

    # 如果还是找不到文件，发出强力警告
    if [ ! -f "$PRISMA_QUERY_ENGINE_LIBRARY" ]; then
      echo "❌ 严重错误：在 Nix Store 中找不到 Prisma 引擎！"
      echo "尝试运行: ls -R ${pkgs.prisma-engines}"
    fi
    
    # 额外检查：如果路径不包含 /nix/store，发出警告
    if [[ ! "$(which moon)" == *"/nix/store"* ]]; then
      echo "⚠️ 警告：Moon 可能不是由 Nix 提供的，请检查路径！"
    fi
  '';
}