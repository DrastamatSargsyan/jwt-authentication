using System;
using System.Data.SqlClient;

namespace DataAccessLayer
{
    static class ConnectionBuilder
    {
        static public string GetConnectionString()
        {
            SqlConnectionStringBuilder build = new SqlConnectionStringBuilder();

            build.DataSource = @"DESKTOP-6NUHAOM\DROSQL";
            build.InitialCatalog = "Donations";
            build.IntegratedSecurity = true;

            return build.ConnectionString;
        }

    }
}
