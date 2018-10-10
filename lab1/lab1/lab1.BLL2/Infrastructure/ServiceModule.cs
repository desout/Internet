using lab1.DAL.Interfaces;
using lab1.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac.Builder;
using Autofac;
using lab1.BLL.Services;
using Autofac.Core;
using lab1.BLL.Interfaces;
using lab1.DAL.Entities;
using lab1.DAL.EF;

namespace lab1.BLL.Infrastructure
{
    public class ServiceModule: Module
    {
        private string connectionString;
        public ServiceModule(string connection)
        {
            connectionString = connection;
        }
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<EFUnitOfWork>().
            As<IUnitOfWork>()
            .WithParameter(new TypedParameter(typeof(string),connectionString))
            .InstancePerLifetimeScope();
            builder.RegisterType<ToDoService>().
            As<IToDoService>()
            .InstancePerLifetimeScope();
        }

    }
}
