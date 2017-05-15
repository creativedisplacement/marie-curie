using MarieCurie.Interview.Assets;
using MarieCurie.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace MarieCurie.Data
{
    public class HelperService : IHelperService
    {
        private readonly IHelperServiceRepository repository;

        public HelperService(IHelperServiceRepository repository)
        {
            this.repository = repository;
        }

        public IEnumerable<Models.HelperService> GetServices()
        {
            var services = repository.Get();
            var helperServices = new List<Models.HelperService>();

            //bind to the new model
            foreach (var service in services)
            {
                var helperService = new Models.HelperService();
                var result = CalculateOpeningHours(service);

                helperService.Title = service.Title;
                helperService.Description = service.Description;
                helperService.TelephoneNumber = service.TelephoneNumber;
                helperService.IsOpen = result.IsOpen;
                helperService.OpenMessage = result.OpenMessage;

                helperServices.Add(helperService);
            }

            return helperServices;
        }

        //add method to do calculations returns
        private Result CalculateOpeningHours(Interview.Assets.Model.HelperService service)
        {
            var result = new Result();
            var currentDay = DateTime.Today.DayOfWeek.ToString();
            var currentHour = Convert.ToInt16(DateTime.Now.Hour);

            var currentDayOpeningHoursPropertyName = currentDay + "OpeningHours";
            var currentDayOpeningHours = service.GetType().GetProperty(currentDayOpeningHoursPropertyName).GetValue(service, null);

            var currentDayOpeningHoursArray = ((IEnumerable)currentDayOpeningHours).Cast<int>()
                               .Select(h => Convert.ToInt16(h.ToString()))
                               .ToArray();

            if (currentHour > currentDayOpeningHoursArray[0] && currentHour < currentDayOpeningHoursArray[1])
            {
                result.IsOpen = true;
                result.OpenMessage = string.Format("Open today until {0}", ConvertIntegerToHours(currentDayOpeningHoursArray[1]));
            }
            else
            {
                for (int i = 1; i < 7; i++)
                {
                    currentDay = DateTime.Today.AddDays(i).DayOfWeek.ToString();
                    bool opensTomorrow = DateTime.Today.AddDays(1).DayOfWeek.ToString() == currentDay ? true : false;
                    currentDayOpeningHoursPropertyName = currentDay + "OpeningHours";
                    currentDayOpeningHours = service.GetType().GetProperty(currentDayOpeningHoursPropertyName).GetValue(service, null);

                    currentDayOpeningHoursArray = ((IEnumerable)currentDayOpeningHours).Cast<int>()
                                       .Select(h => Convert.ToInt16(h.ToString()))
                                       .ToArray();

                    if (currentDayOpeningHoursArray[0] > 0)
                    {
                        result.IsOpen = false;
                        result.OpenMessage = string.Format("Reopens {0} at {1}", opensTomorrow == true ? "tomorrow" : currentDay, ConvertIntegerToHours(currentDayOpeningHoursArray[0]));
                        break;
                    }
                }

            }

            return result;
        }

        //from https://forums.asp.net/t/2023523.aspx?Convert+integer+to+Hour+C+
        public string ConvertIntegerToHours(int i)
        {
            // If your integer is greater than 12, then use the modulo approach, otherwise output the value (padded)
            return (i > 12) ? (i % 12).ToString("0") + "pm" : i.ToString("0") + "am";
        }

    }
}
