using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace lab1.DAL.Entities
{
    public class ToDo
    {
        [Display(Name = "Id")]
        public int id { get; set; }
        [Display(Name = "caption")]
        [Required(ErrorMessage = "Set caption")]
        public string caption { get; set; }
        [Display(Name = "description")]
        [Required(ErrorMessage = "Set description")]
        public string description { get; set; }
        [Display(Name = "Status")]
        [Required(ErrorMessage = "Set status")]
        public string status { get; set; }
        [Display(Name = "last Changes Date")]
        [Required(ErrorMessage = "Set last Changes Date")]
        public DateTime finishDate { get; set; }
        [Display(Name = "Creation Date")]
        [Required(ErrorMessage = "Set Creation Date")]
        public DateTime creationDate { get; set; }

       
        
    }
}
