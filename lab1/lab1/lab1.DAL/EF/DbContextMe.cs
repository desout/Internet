using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using lab1.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace lab1.DAL.EF
{
    public class DbContextMe: DbContext
    {
        public DbSet<ToDo> ToDos { get; set; }
        private string connectionString;
        public DbContextMe(string connectionString)
        {
            this.connectionString = connectionString;
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this.connectionString);

        }
    }
}
