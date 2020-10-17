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
    [Route("api/notes")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ILogger<NotesController> _logger;
        private readonly ConnectionString _connectionString;
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };
        public NotesController(ILogger<NotesController> logger, ConnectionString connectionString)
        {
            _logger = logger;
            _connectionString = connectionString;

        }

        [HttpGet]
        public async Task<IActionResult> GetNotes()
        {
            Console.WriteLine("Database [SELECT] query is executed from .NetCore/C#");
            IList<Notes> notes = new List<Notes>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                string sql = "SELECT * FROM notes";
                using var cmd = new NpgsqlCommand(sql, con);

                using NpgsqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (reader.Read())
                {
                    notes.Add(new Notes(){id=reader.GetInt32(0), notes_desc=reader.GetString(1)});
                }
            }
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> AddNotes(MyData mydata)
        {
            Console.WriteLine("Database [INSERT] query is executed from .NetCore/C#");
            IList<Notes> notes = new List<Notes>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                var sql = "INSERT INTO notes(notes_desc) VALUES(@notes_desc)";
                using var cmd = new NpgsqlCommand(sql, con);

                cmd.Parameters.AddWithValue("notes_desc", mydata.notes_desc);
                cmd.Prepare();

                await cmd.ExecuteNonQueryAsync();

                Console.WriteLine("row inserted");
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotes(int id)
        {
            Console.WriteLine("Database [DELETE] query is executed from .NetCore/C#");
            IList<Notes> notes = new List<Notes>();
            using (var con = new NpgsqlConnection(_connectionString.Value))
            {
                con.Open();
                var sql = "DELETE FROM notes WHERE id="+id;
                using var cmd = new NpgsqlCommand(sql, con);
                cmd.Prepare();
                await cmd.ExecuteNonQueryAsync();
                Console.WriteLine("row deleted");
            }
            return Ok();
        }

        public class MyData {
            public string notes_desc { get; set; }
        }
    }
}