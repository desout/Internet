using lab1.BLL.DTO;
using lab1.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using lab1.DAL.Entities;
using lab1.DAL.Interfaces;
using lab1.BLL.Infrastructure;

namespace lab1.BLL.Services
{
    public class ToDoService : IToDoService
    {
        IUnitOfWork db { get; set; }
        public ToDoService(IUnitOfWork uow)
        {
            db = uow;
        }
        public void Dispose()
        {
            db.Dispose();
        }

        public ToDoDTO GetToDo(int? id)
        {
            var toDo = db.ToDos.Get(id.Value);
            if (toDo == null)
                throw new ValidationException("ToDos doesn't find", "");

            return new ToDoDTO { id = toDo.id, caption = toDo.caption, creationDate = toDo.creationDate, description = toDo.description, finishDate = toDo.finishDate, status = toDo.status };
        }
        public IEnumerable<ToDoDTO> GetToDos()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<ToDo, ToDoDTO>()).CreateMapper();
            var tmp = db.ToDos.GetAll();
            return mapper.Map<IEnumerable<ToDo>, List<ToDoDTO>>(db.ToDos.GetAll());
        }

        public ToDoDTO CreateToDo()
        {
            db.ToDos.Create(new ToDo { caption = "UNDEFINED", creationDate = DateTime.Now, finishDate = DateTime.Now, status = "NEW", description = "UNDEFINED" });
            db.Save();
            var item = db.ToDos.GetAll().LastOrDefault();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<ToDo, ToDoDTO>()).CreateMapper();
            return mapper.Map<ToDo, ToDoDTO>(db.ToDos.GetAll().LastOrDefault());
        }

        public ToDoDTO UpdateToDo(ToDoDTO toDo)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<ToDo, ToDoDTO>()).CreateMapper();
            mapper.Map<ToDoDTO, ToDo>(toDo);
            db.ToDos.Update(mapper.Map<ToDoDTO, ToDo>(toDo));
            db.Save();
            return toDo;
        }
    }
}