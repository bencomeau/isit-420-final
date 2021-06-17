using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ISIT420HomeworkFour.Controllers
{
    public class ValuesController : ApiController
    {
        NodeOrders500Entities myDB = new NodeOrders500Entities();

        [Route("Home/Index/{id?}")]
        public IHttpActionResult MyIndex(int? id)
        {
            return Ok(id);
        }

        //[HttpGet("/URate/{id}")]
        //public IHttpActionResult MyRoute(int id)
        //{
        //    return Ok(id);
        //}


        // GET api/values
        public IEnumerable<string> Get()
        {
            var data = from salespeople in myDB.SalesPersonTables
                       select salespeople.FirstName + "" + salespeople.LastName;

            return data.ToList();
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
