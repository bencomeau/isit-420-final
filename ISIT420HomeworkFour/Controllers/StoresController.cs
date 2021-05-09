using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ISIT420HomeworkFour.Controllers
{
    public class StoresController : ApiController
    {
        NodeOrders500Entities myDB = new NodeOrders500Entities();

        public IHttpActionResult GetStores()
        {
            var data = from stores in myDB.StoreTables
                       select stores.City;

            if (data.Any())
            {
                return Json(new { data = data.ToList() });
            } else
            {
                return NotFound();
            }
        }

        public IHttpActionResult GetStoreSalesPerformance(string city)
        {
            var data = from orders in myDB.Orders
                       where orders.StoreTable.City == city
                       select orders.pricePaid;

            if (data.Any())
            {
                return Json(new { sum = data.Sum() });
            } else
            {
                return NotFound();
            }
        }
    }
}
