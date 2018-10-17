using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using lab1.BLL.DTO;
using lab1.BLL.Interfaces;
using lab1.BLL.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lab1.Controllers
{
    [Route("api/[controller]")]
    public class todoController : Controller
    {
        IToDoService ToDoService;
        public todoController(IToDoService toDoService)
        {
            ToDoService =toDoService;
        }

        // GET: api/<controller>
        /// <summary>
        /// Retrieve All Todos
        /// </summary>
        /// <returns>A list of ToDos</returns>
        [HttpGet]
        public List<ToDoDTO> Get()
        {
            var elems = ToDoService.GetToDos().ToList();
            return elems;

        }

        /// <summary>
        /// Retrieve the todos by their ID.
        /// </summary>
        /// <param name="id">The ID of the desired ToDos</param>
        /// <returns>A string status</returns>
        [HttpGet("{id}")]
       
        public IActionResult Get(int id)
        {
            try
            {
                var elem = ToDoService.GetToDo(id);
                return new ObjectResult(elem);
            }
            catch(Exception)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Retrieve the new ToDos
        /// </summary>
        /// <returns>New ToDos</returns>
        [HttpPost]
        public IActionResult Post()
        {

            var item = ToDoService.CreateToDo();
            return Ok(item);
        }
        /// <summary>
        /// Putting ToDo
        /// </summary>
        /// <param name="id">id of new ToDos</param>
        /// <param name="todo">ToDo item</param>
        /// <returns>A ToDo item</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id,[FromBody]ToDoDTO todo)
        {
            try
            {
                var item = ToDoService.UpdateToDo(todo);
                return Ok(item);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }


        }

    }
}
