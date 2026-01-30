# devenv.nix
{ pkgs, lib, config, inputs, ... }:

{
  # 1. 语言环境：锁定业务核心版本
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20; # 锁定 Node 20
    npm.enable = true;        
  };

  languages.python = {
    enable = true;
    version = "3.11"; # 锁定 Python 3.11
  };

  # 2. 系统级依赖：确保所有工具由 Nix 供给
  packages = [
    pkgs.openssl
    pkgs.python311Packages.pip
    pkgs.moon           # Nix 提供的 Moonrepo
    pkgs.proto          # Nix 提供的 Proto 引擎
    pkgs.prisma-engines # 包含二进制引擎
  ];

  # 3. 环境变量注入：主权加固与回退策略
  env = {
    # --- 强行禁止 Moon 自动下载 Proto (主权核心) ---
    MOON_SKIP_PROTO_INSTALL = "true";
    MOON_NO_PROTO = "true";
    PROTO_OFFLINE = "true";

    # --- Prisma 修复：忽略缺失的校验，允许在包损坏时回退 ---
    PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING = "1";
  };

  # 4. 启动脚本：环境初始化与路径清理
  enterShell = ''
    echo "🦁 2026 Sovereign Stack: Solid Mode (Healing...)"
    
    # 关键：清除之前可能存在的错误路径变量，防止干扰 Prisma 运行
    unset PRISMA_QUERY_ENGINE_BINARY
    unset PRISMA_QUERY_ENGINE_LIBRARY
    unset PRISMA_SCHEMA_ENGINE_BINARY

    echo "Node version:   $(node --version)"
    echo "Moon Path:      $(which moon)"
    
    # 路径一致性检查
    if [[ ! "$(which moon)" == *"/nix/store"* ]]; then
      echo "⚠️ 警告：Moon 可能不是由 Nix 提供的，请检查 PATH！"
    fi
  '';
}