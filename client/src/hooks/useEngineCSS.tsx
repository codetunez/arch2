import { useSiteInformation } from "./useSiteInformation";

export default function useEngineCSS() {

    const {engine} = useSiteInformation();
    
    
    if(engine === null) return null;
    
    let stylePath = null;
    
    switch(engine) {
        case "bootstrap3": {
            stylePath = "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
            break;
        }
        case "bootstrap5": {
            stylePath = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            break;
        }
        case "tailwind": {
          stylePath = "https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css";
          break;
        }
        case "skeleton": {
          stylePath = "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css";
          break;
        }
    }

    return (
      stylePath ? (
        <div>
          {stylePath && <link rel="stylesheet" type="text/css" href={stylePath} />}
        </div>
      ) : null
    );
  }