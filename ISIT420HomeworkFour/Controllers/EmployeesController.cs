using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ISIT420HomeworkFour.Controllers
{
    public class EmployeesController : ApiController
    {
        NodeOrders500Entities myDB = new NodeOrders500Entities();

        public IHttpActionResult GetEmployees()
        {
            var data = from employees in myDB.SalesPersonTables
                       select employees.FirstName + " " + employees.LastName;
            
            if (data.Any())
            {
                return Json(new { data = data.ToList() });
            } else
            {
                return NotFound();
            }
        }

        public IHttpActionResult GetEmployeeSalesPerformance(string fullName)
        {
            var data = from order in myDB.Orders
                       where order.SalesPersonTable.FirstName + " " + order.SalesPersonTable.LastName == fullName
                       select order.pricePaid;

            if (data.Any())
            {
                return Json(new { sum = data.Sum() });
            }
            else
            {
                return NotFound();
            }
        }
    }
}
