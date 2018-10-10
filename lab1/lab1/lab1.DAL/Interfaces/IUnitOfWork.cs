using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using lab1.DAL.Entities;
namespace lab1.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<ToDo> ToDos { get; }
        void Save();
    }
}
