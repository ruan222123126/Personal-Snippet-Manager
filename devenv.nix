# devenv.nix
{ pkgs, lib, config, inputs, ... }:

{
  # 1. 启用语言环境
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20; # 锁定 Node 版本
    npm.enable = true;        # 你的项目用的是 package-lock.json
  };

  languages.python = {
    enable = true;
    version = "3.11";
    # 如果你的 scripts/ 里的脚本需要 pip 库，可以在这里加
    # venv.enable = true; 
  };

  # 2. 系统级依赖 (Prisma 极其需要 OpenSSL)
  packages = [
    pkgs.openssl
    pkgs.python311Packages.pip # 如果你需要手动跑 pip
  ];

  # 3. 环境变量注入 (解决 Prisma 在 Linux 下找不到库的问题)
  env.PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.so";
  env.PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
  env.PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  
  # 4. 启动欢迎语 (可选，为了仪式感)
  enterShell = ''
    echo "🦁 2026 Sovereign Stack: Environment Loaded."
    echo "Node version: $(node --version)"
    echo "Python version: $(python --version)"
  '';
}