# devenv.nix
{ pkgs, lib, config, inputs, ... }:

{
  # 1. 启用语言环境
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20; # 锁定 Node 版本
    npm.enable = true;        
  };

  languages.python = {
    enable = true;
    version = "3.11";
  };

  # 2. 系统级依赖
  packages = [
    pkgs.openssl
    pkgs.python311Packages.pip
    pkgs.moon    # 由 Nix 提供 Moonrepo
    pkgs.proto   # 由 Nix 提供 Proto 引擎
  ];

  # 3. 环境变量注入：主权加固核心
  env = {
    # --- 关键：强制 Moon 放弃 proto 引擎，直接使用全局路径 ---
    MOON_SKIP_PROTO_INSTALL = "true";
    MOON_NO_PROTO = "true";
    PROTO_OFFLINE = "true";

    # --- 关键：解决 'system' 无法解析的问题 ---
    # 告诉 Moon 不要去检测版本，直接信任当前的 node 命令
    MOON_DISABLE_CHROMEOS_TOOLCHAIN = "true"; # 某些环境下的干扰项
    
    # (保留你之前的 Prisma 环境变量)
    PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.so";
    PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
    PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
  };

  # 4. 启动欢迎语与路径验证
  enterShell = ''
    echo "🦁 2026 Sovereign Stack: Environment Loaded (Solid Mode)."
    echo "Node version:   $(node --version)"
    echo "Python version: $(python --version)"
    echo "Moon Path:      $(which moon)"
    echo "Proto Path:     $(which proto)"
    
    # 额外检查：如果路径不包含 /nix/store，发出警告
    if [[ ! "$(which moon)" == *"/nix/store"* ]]; then
      echo "⚠️ 警告：Moon 可能不是由 Nix 提供的，请检查路径！"
    fi
  '';
}