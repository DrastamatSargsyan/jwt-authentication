using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JWT.DataAccess
{
    static public class ConnectionManager
    {
        private static readonly string ConnectionString;

        static ConnectionManager()
        {
            SqlConnectionStringBuilder build = new SqlConnectionStringBuilder
            {
                DataSource = @"DESKTOP-6NUHAOM\DROSQL",
                InitialCatalog = "MyDb",
                IntegratedSecurity = true
            };

            ConnectionString = build.ConnectionString;
        }

        static public string GetConnectionString() => ConnectionString;
    }
}
