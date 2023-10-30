import React, { useEffect, useState } from "react";
import { getServices } from "../axios/api";
import ServicesRadioButtons from "../components/ServicesRadioButtons";

function Services() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState({ id: 1, name: undefined });

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await getServices();
        setServices(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchServices();
  }, []);

  return (
    <div>
      <div className="text-xl text-center">
        We offer a variety of different services! Please select the services you
        would like to know more about.
      </div>
      <div className="grid grid-cols-2">
        {true ? (
          <div>
            <div>Got pain and don’t know why?</div>
            <div>Let us run your diagnostics. We’re human mechanics.</div>
            <div>
              Do you struggle with chronic or nagging pain and not know why?
              Have you told yourself it’s just age, or circumstance, a lack of
              exercise or self care? You don’t have to live with pain, and
              you’re not hurting “just because.” There is a root cause to your
              pain, and we’d love to get to the bottom of it–both with you and
              for you.
            </div>
            <div>
              Some of our favorite patient success stories begin with a big
              question mark. Patients often come to us without a specific
              diagnosis, and, using our sleuthing skills, we listen to people
              and their bodies to solve the puzzle. Once we discover the root
              cause of your discomfort or limitation, we design a care plan
              tailored just to you. Then we empower you to manage your care
              through home exercise and office visits until we’re all confident
              that you’ve overcome the cause of your pain.
            </div>
            <div>
              Don’t live with unnecessary aches and limitations. Life is too
              short! We can help.
            </div>
          </div>
        ) : (
          <></>
        )}

        <ServicesRadioButtons
          servicesPage={true}
          services={services}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}

export default Services;
