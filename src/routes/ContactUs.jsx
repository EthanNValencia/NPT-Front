import React, { useEffect, useState } from "react";
import { getOffices } from "../axios/api";

function ContactUs() {
  const [offices, setOffices] = useState([]); // TODO: Implement this data below.

  useEffect(() => {
    async function fetchOffices() {
      try {
        const data = await getOffices();
        setOffices(data);
        console.log(JSON.stringify(data));
      } catch (error) {
        console.error("Error loading FAQ:", error);
      }
    }
    fetchOffices();
  }, []);

  return (
    <div>
      <div className="grid grid-flow-rows grid-cols-2">
        <p>
          You may always visit our office, located on Holland’s north side at:
        </p>
        <p>12723 N Bellwood Dr., Suite 10 Holland, MI 49424</p>
        <p>Phone:</p>
        <p>616.796.9391</p>
        <p>Fax:</p>
        <p>888.714.4474</p>
        <p>Email:</p>
        <address>info@nephewpt.com</address>
        Please fax referral forms to the number above. Click here to download
        referral form. Thank you! NEED REFERRAL FORM
      </div>
      <div>
        <button
          type="button"
          className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
          disabled=""
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto: info@nephewpt.com"
          >
            Email Us
          </a>
        </button>
        <button
          type="button"
          className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
          disabled=""
        >
          <a target="_blank" rel="noopener noreferrer" href="tel: 6167969391">
            Call Us
          </a>
        </button>
        <button
          type="button"
          className="inline-flex items-center px-8 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black first-line:transition ease-in-out duration-150 cursor-pointer"
          disabled=""
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://maps.google.com/?q= 12723 N Bellwood Dr., Suite 10 Holland, MI 49424"
          >
            Google Map Us
          </a>
        </button>
      </div>
    </div>
  );
}

export default ContactUs;
