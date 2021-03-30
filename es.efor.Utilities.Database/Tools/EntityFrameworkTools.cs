using es.efor.Utilities.Database.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace es.efor.Utilities.Database.Tools
{
    public static class EntityFrameworkTools
    {
        /// <param name="options"></param>
        /// <param name="configuration"></param>
        /// <param name="migrationAssembly">Use null to disable migrations.</param>
        public static void ConfigureConnection<TDbContext>(
            DbContextOptionsBuilder options,
            EfDatabaseType dbType,
            string connectionString,
            string migrationAssembly = null,
            bool useLazyProxy = true)
            where TDbContext : DbContext
        {
            if (dbType == EfDatabaseType.Unknown)
            {
                var bgColor = Console.BackgroundColor;
                var color = Console.ForegroundColor;
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine();
                Console.Write("WARNING: ");
                Console.BackgroundColor = bgColor;
                Console.ForegroundColor = color;
                Console.WriteLine($"appsettings -> Database -> DbType is set as [{EfDatabaseType.Unknown}]. Defaulting to [{EfDatabaseType.Memory}].");
                dbType = EfDatabaseType.Memory;
            }
            var typeOfDbContext = typeof(TDbContext);

            if (migrationAssembly == string.Empty)
            {
                migrationAssembly = typeOfDbContext
                    .Assembly.GetName().Name;
            }

            switch (dbType)
            {
                case EfDatabaseType.MariaDb:
                case EfDatabaseType.MySql:
                    //options.UseMySql(connectionString, o =>
                    //{
                    //    if (migrationAssembly != null)
                    //    {
                    //        o.MigrationsAssembly(migrationAssembly);
                    //    }
                    //});
                    break;
                case EfDatabaseType.Memory:
                    options.UseInMemoryDatabase(typeOfDbContext.FullName, o => { });
                    break;
                case EfDatabaseType.SqlServer:
                    options.UseSqlServer(connectionString, o =>
                    {
                        if (migrationAssembly != null)
                        {
                            o.MigrationsAssembly(migrationAssembly);
                        }
                        //o.UseNetTopologySuite();
                    });
                    break;
                default:
                    throw new Exception($"Database server [{dbType.ToString()}] is not supported");
            }

            if (useLazyProxy)
            {
                options.UseLazyLoadingProxies();
            }
        }

        public async static Task ApplyMigrations<TDbContext>(
            IServiceProvider serviceProvider,
            EfDatabaseType dbType)
            where TDbContext : DbContext
        {
            var db = serviceProvider.GetService<TDbContext>();
            if (dbType == EfDatabaseType.MariaDb || dbType == EfDatabaseType.MySql)
            {
                await db.Database.ExecuteSqlRawAsync(@"SET default_storage_engine=InnoDB;");
                await db.Database.ExecuteSqlRawAsync(@"ALTER DATABASE CHARACTER SET utf8 COLLATE utf8_general_ci;");
            }

            await db.Database.MigrateAsync();
        }
    }
}
