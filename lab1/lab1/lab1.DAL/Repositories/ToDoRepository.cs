using lab1.DAL.EF;
using lab1.DAL.Entities;
using lab1.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab1.DAL.Repositories
{
    public class ToDoRepository : IRepository<ToDo>
    {
        private DbContextMe db;

        public ToDoRepository(DbContextMe context)
        {
            this.db = context;
        }
        public void Create(ToDo item)
        {
            db.ToDos.Add(item);
        }

        public void Delete(int id)
        {
            ToDo toDo = db.ToDos.Find(id);
            if (toDo != null)
            {
                db.ToDos.Remove(toDo);
            }
        }

        public IEnumerable<ToDo> Find(Func<ToDo, bool> predicate)
        {
            return db.ToDos.Where(predicate).ToList();
        }

        public ToDo Get(int id)
        {
            return db.ToDos.Find(id);
        }

        public IEnumerable<ToDo> GetAll()
        {
            return db.ToDos.ToList();
        }

        public void Update(ToDo item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
