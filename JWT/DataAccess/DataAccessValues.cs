using JWT.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JWT.DataAccess
{
    public class DataAccessValues
    {
        public List<ValueModel> GetValues()
        {
            List<ValueModel> List = new List<ValueModel>();
            try
            {
                using(SqlConnection Conn = new SqlConnection(ConnectionManager.GetConnectionString()))
                {
                    Conn.Open();

                    using(SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = Conn;
                        cmd.CommandText = "GetValues";
                        cmd.CommandType = CommandType.StoredProcedure;

                        using(SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if(reader.HasRows)
                            {
                                int id = reader.GetOrdinal("Id");
                                int value = reader.GetOrdinal("Value");

                                while(reader.Read())
                                {
                                    List.Add(new ValueModel
                                    {
                                        Id = reader.GetInt32(id),
                                        Value = reader.GetString(value)
                                    });
                                }
                            }
                        }
                    }    
                }
                return List;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
