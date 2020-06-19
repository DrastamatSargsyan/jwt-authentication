using JWT.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace JWT.DataAccess
{
    public class DataAccessUsers
    {
        public List<UserModel> Login(string username = null)
        {
            List<UserModel> List = new List<UserModel>();
            try
            {
                using(SqlConnection conn = new SqlConnection(ConnectionManager.GetConnectionString()))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = conn;
                        cmd.CommandText = "Login";
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@Username", SqlDbType.VarChar, 50).Value = username;
                        
                        using(SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if(reader.HasRows)
                            {
                                int userId = reader.GetOrdinal("Id");
                                int userName = reader.GetOrdinal("Username");
                                int userPass = reader.GetOrdinal("Password");
                                int userEmail = reader.GetOrdinal("Email");

                                while(reader.Read())
                                {
                                    List.Add(new UserModel
                                    {
                                        Id = reader.GetInt32(userId),
                                        Username = reader.GetString(userName),
                                        Password = reader.GetString(userPass),
                                        Email = reader.GetString(userEmail)
                                    });
                                }
                            }
                        }
                    }
                }

                return List;
            }
            catch(Exception ex)
            {
                throw (ex);
            }
        }

    }
}
