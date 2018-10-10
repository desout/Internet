using lab1.BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab1.BLL.Interfaces
{
    public interface IToDoService
    {
        ToDoDTO CreateToDo();
        ToDoDTO UpdateToDo(ToDoDTO toDo);
        ToDoDTO GetToDo(int? id);
        IEnumerable<ToDoDTO> GetToDos();
        void Dispose();
    }
}
