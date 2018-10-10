using lab1.DAL.EF;
using lab1.DAL.Entities;
using lab1.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab1.DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private DbContextMe db;
        private ToDoRepository toDoRepository;
        private bool disposed;

        public IRepository<ToDo> ToDos
        {
            get
            {
                if (toDoRepository == null)
                    toDoRepository = new ToDoRepository(db);
                return toDoRepository;
            }
        }

        public EFUnitOfWork(string connectionString)
        {
            this.db = new DbContextMe(connectionString);
            DbInitializer.initialize(db);

        }
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        public void Save()
        {
            db.SaveChanges();
        }
    }
}
