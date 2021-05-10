using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ISIT420HomeworkFour.Controllers
{
    public class MarkupsClass
    {
        public string city { get; set; }
        public int total { get; set; }
    }
    public class MarkupsController : ApiController
    {
        NodeOrders500Entities myDB = new NodeOrders500Entities();

        public IHttpActionResult GetMarkups()
        {
            //used to get cities that have prices paid over $13
            //used IEnumerables to allow for data to be converted into a list
            IEnumerable<MarkupsClass> data =
                from order in myDB.Orders
                where order.pricePaid > 13
                group order by order.StoreTable.City into cities
                select new MarkupsClass()
                {
                    city = cities.Key,
                    total = cities.Count()
                };
            //create list to add data and sort by number of cds sold on line 34
            List<MarkupsClass> stores = data.ToList();
            stores = stores.OrderByDescending(x => x.total).ToList();

            if (data.Any())
            {
                return Json(new { stores });
            }
            else
            {
                return NotFound();
            }
        }
    }
}
