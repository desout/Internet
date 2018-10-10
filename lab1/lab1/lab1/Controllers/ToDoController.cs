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
        [HttpGet]
        public List<ToDoDTO> Get()
        {
            var elems = ToDoService.GetToDos().ToList();
            return elems;

        }

        // GET api/<controller>/5
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

        // POST api/<controller>
        [HttpPost]
        public IActionResult Post()
        {

            var item = ToDoService.CreateToDo();
            return Ok(item);
        }
        // PUT api/<controller>/5
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
