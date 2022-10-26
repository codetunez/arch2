import { useSiteInformation } from "./useSiteInformation";

export default function useEngineCSS() {

    const {engine} = useSiteInformation();
    
    
    if(engine === null) return null;
    
    let stylePath = null;
    
    switch(engine) {
        case "bootstrap3": {
            stylePath = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
            break;
        }
        case "skeleton": {
          stylePath = "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css";
          break;
        }
    }

    return (
      <div>
        {stylePath && <link rel="stylesheet" type="text/css" href={stylePath} />}
      </div>
    );
  }