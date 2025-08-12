/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow server components to use these packages without bundling their native deps
  experimental: {
    serverComponentsExternalPackages: ["knex", "pg"],
  },

  webpack: (config, { isServer }) => {
    // Knex conditionally requires many DB clients (e.g., oracledb, mysql, sqlite3).
    // When bundling, Next/Webpack may try to resolve those even if unused.
    // Mark them as externals and alias them to false to avoid "Can't resolve 'oracledb'" errors.
    const ignoreMods = [
      "oracledb",
      "mysql",
      "mysql2",
      "mssql",
      "pg-native",
      "sqlite3",
      "better-sqlite3",
      "tedious",
    ];

    // Ensure arrays/objects exist
    config.externals = config.externals || [];
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    if (isServer) {
      config.externals.push(...ignoreMods);
    }

    for (const mod of ignoreMods) {
      config.resolve.alias[mod] = false;
    }

    return config;
  },
};

module.exports = nextConfig;
