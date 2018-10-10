using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab1.BLL.DTO
{
    public class ToDoDTO
    {
        public int id { get; set; }
        public string caption { get; set; }
        public string description { get; set; }
        public string status { get; set; }
        public DateTime finishDate { get; set; }
        public DateTime creationDate { get; set; }
    }
}
