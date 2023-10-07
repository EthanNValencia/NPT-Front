import React from "react";

// https://www.youtube.com/channel/UCP0_SudzP9_KQQKsUXOJPRg
//
//
// https://www.yelp.com/biz/nephew-physical-therapy-holland

function Footer() {
  
  const youtubeUrl = "https://www.youtube.com/channel/UCP0_SudzP9_KQQKsUXOJPRg";
  const facebookUrl = "https://www.facebook.com/nephewpt";
  const instagramUrl = "https://www.instagram.com/nephewpt/";
  const yelpUrl = "https://www.yelp.com/biz/nephew-physical-therapy-holland";
  const height = 36;
  const width = 36;

  return (
    <div className="p-4 bg-npt_colors-325 text-white rounded-b-lg">
      <div className="flex justify-between justify-items-center items-center ">
        <div className="flex gap-4 invert">
          <a target="_blank" rel="noopener noreferrer" href={instagramUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              width={width}
              height={height}
            >
              <g>
                <path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z" />
                <path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </g>
            </svg>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={facebookUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              width={width}
              height={height}
            >
              <g>
                <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
              </g>
            </svg>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={youtubeUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              width={width}
              height={height}
            >
              <g id="XMLID_184_">
                <path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" />
              </g>
            </svg>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={yelpUrl}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
              width={width}
              height={height}
            >
              <g>
                <path d="M9.502,12.29c0.539,0.195,1.138,0.482,1.28,1.095c0.002,0.007,0.003,0.013,0.005,0.02c0.071,0.308,0.02,0.631-0.143,0.902   c-0.387,0.645-1.283,0.682-1.942,0.835l-0.003-0.001l-3.671,0.848c-0.377,0.087-0.755,0.183-1.145,0.155   c-0.459-0.033-0.836-0.168-1.092-0.572c-0.349-0.552-0.366-1.366-0.37-2c-0.005-0.702,0.107-1.399,0.331-2.064   c0.132-0.389,0.399-0.781,0.788-0.944c0.427-0.179,0.947-0.04,1.369,0.09L9.502,12.29z" />
                <path d="M17.517,7.743c0.303-0.282,0.531-0.45,0.742-0.555c0.538-0.288,1.178-0.02,1.571,0.377c0.493,0.499,0.898,1.077,1.2,1.71   c0.274,0.572,0.614,1.312,0.54,1.963c-0.038,0.458-0.351,0.773-0.731,0.994c-0.338,0.196-0.72,0.276-1.097,0.363l-4.778,1.104   c-0.659,0.161-1.375-0.22-1.529-0.902c-0.002-0.007-0.003-0.013-0.005-0.02c-0.129-0.607,0.277-1.136,0.672-1.546L17.517,7.743z" />
                <path d="M12.478,11.284c0.346-0.435,0.345-1.083,0.376-1.613c0.104-1.771,0.214-3.542,0.301-5.314   c0.033-0.671,0.105-1.333,0.066-2.009c-0.033-0.558-0.037-1.198-0.389-1.656C12.21-0.116,10.884-0.05,9.98,0.075   c-0.277,0.038-0.555,0.09-0.83,0.156C8.874,0.298,8.602,0.37,8.335,0.455C7.467,0.74,6.247,1.262,6.04,2.262   C5.924,2.827,6.2,3.406,6.414,3.922c0.26,0.626,0.614,1.189,0.937,1.778c0.854,1.554,1.724,3.099,2.592,4.646   c0.383,0.682,0.907,1.59,1.848,1.371C12.057,11.654,12.3,11.489,12.478,11.284z" />
                <path d="M9.944,16.341c0.153-0.192,0.32-0.384,0.519-0.531c0.303-0.228,0.687-0.314,1.052-0.191   c0.35,0.118,0.623,0.452,0.724,0.812c0.083,0.299,0.093,0.633,0.081,0.934c-0.062,1.644-0.073,3.296-0.224,4.936   c-0.041,0.446-0.108,0.986-0.44,1.319c-0.308,0.302-0.778,0.401-1.186,0.378c-0.535-0.031-1.063-0.132-1.571-0.3   c-0.611-0.205-1.192-0.47-1.722-0.839c-0.343-0.239-0.644-0.604-0.698-1.03c-0.069-0.541,0.295-1.047,0.576-1.475L9.944,16.341z" />
                <path d="M20.741,18.067c-0.208-0.233-0.491-0.41-0.749-0.566c-1.459-0.882-2.981-1.698-4.517-2.438   c-0.544-0.262-1.238-0.444-1.727,0.041c-0.544,0.538-0.272,1.34,0.037,1.92c0.743,1.392,1.438,2.821,2.257,4.171   c0.195,0.323,0.389,0.657,0.67,0.914c0.316,0.289,0.739,0.352,1.146,0.258c0.664-0.153,1.295-0.688,1.77-1.152   c0.46-0.452,0.866-0.945,1.182-1.51C21.095,19.194,21.151,18.527,20.741,18.067z" />
              </g>
            </svg>
          </a>
        </div>
        <div className="text-xs">Developed by Nephew Software Solutions</div>
      </div>
    </div>
  );
}

export default Footer;
