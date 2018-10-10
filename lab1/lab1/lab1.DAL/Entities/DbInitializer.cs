using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading;
using lab1.DAL.EF;

namespace lab1.DAL.Entities
{
    public static class DbInitializer
    {
        public static void initialize(DbContextMe db)
        {

            if (db.ToDos.Any())
            {
                return;   
            }
            List<ToDo> toDos = new List<ToDo>();
            toDos.Add(new ToDo { caption = "TEST", creationDate = new DateTime(2018, 5, 4), finishDate = new DateTime(2018, 5, 5), description = "LOREM", status = "NEW" });
            toDos.Add(new ToDo { caption = "TEST2", creationDate = new DateTime(2018, 6, 4), finishDate = new DateTime(2018, 7, 5), description = "LOREM", status = "IN_PROGRESS" });
            db.ToDos.AddRange(toDos);
            db.SaveChanges();    
        }
 


    }
}
