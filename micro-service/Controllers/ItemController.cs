using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using micro_service.Models;
using Npgsql;

namespace micro_service.Controllers
{
    [Route("api/item")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ILogger<ItemController> _logger;
        private readonly ConnectionString _connectionString;
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        public ItemController(ILogger<ItemController> logger, ConnectionString connectionString)
        {
            _logger = logger;
            _connectionString = connectionString;

        }

        [HttpGet]
        public async Task<IActionResult> GetItem()
        {
            Console.WriteLine("Database [SELECT] query is executed from .NetCore/C#");
            IList<Item> item = new List<Item>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                string sql = "SELECT * FROM item";
                using var cmd = new NpgsqlCommand(sql, con);

                using NpgsqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (reader.Read())
                {
                    item.Add(new Item(){id=reader.GetInt32(0), item_desc=reader.GetString(1)});
                }
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(MyData mydata)
        {
            Console.WriteLine("Database [INSERT] query is executed from .NetCore/C#");
            IList<Item> item = new List<Item>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                var sql = "INSERT INTO item(item_desc) VALUES(@item_desc)";
                using var cmd = new NpgsqlCommand(sql, con);

                cmd.Parameters.AddWithValue("item_desc", mydata.item_desc);
                cmd.Prepare();

                await cmd.ExecuteNonQueryAsync();

                Console.WriteLine("row inserted");
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItems(int id)
        {
            Console.WriteLine("Database [DELETE] query is executed from .NetCore/C#");
            IList<Item> item = new List<Item>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                var sql = "DELETE FROM item WHERE id="+id;
                using var cmd = new NpgsqlCommand(sql, con);
                cmd.Prepare();
                await cmd.ExecuteNonQueryAsync();
                Console.WriteLine("row deleted");
            }
            return Ok();
        }

        public class MyData {
            public string item_desc { get; set; }
        }
    }
}