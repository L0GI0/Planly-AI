import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import {useNavigate} from "react-router";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import {MAX_UPLOAD_SIZE} from "../../lib/constants";
import {formatBytes} from "../../lib/utils";
import {useState} from "react";
import {createProject} from "../../lib/puter.action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Planly AI" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProject] = useState<DesignItem[]>([]);

  const handleUploadComplete = async (base64: string) => {

      const newId = Date.now().toString();
      const name = `Residence ${newId}`;

      const newItem = {
          id: newId,
          name,
          sourceImage: base64,
          renderedImage: undefined,
          timestamp: Date.now(),
      }

      const saved = await createProject({item: newItem, visibility: 'private'})

      if(!saved) {
          console.log("Failed to create project");
          return false;
      }

      setProject((prev) => [saved, ...prev]);

      navigate(`/visualizer/${newId}`, {
          state: {
              initialImage: saved.sourceImage,
              initialRender: saved.renderedImage || null,
              name
          }
      });
  }

  return (
      <div className="home">
        <Navbar />
       <section className="hero">
           <div className="announce">
                <div className="dot">
                    <div className="pulse"></div>
                </div>
               <p>Introducing Planly AI 2.0</p>
           </div>
           <h1>Build beautiful spaces at the speed of thought with Planly AI</h1>
           <p className="subtitle">
               Planly is AI-first design environment that helps you visualize, render, and ship
               architectural project faster than ever.
           </p>
           <div className="actions">
               <a href="#upload" className="cta">
                   Start Building <ArrowRight className="icon"/>
               </a>
               <Button variant="outline" size="lg" className="demo">
                   Watch Demo
               </Button>
           </div>

           <div id="upload" className="upload-shell">
               <div className="grid-overlay"/>
               <div className="upload-card">
                   <div className="upload-head">
                       <div className="upload-icon">
                           <Layers className="icon"/>
                       </div>

                       <h3>Upload your floor plan</h3>
                       <p>Supports JPG, PNG, formats up to {formatBytes(MAX_UPLOAD_SIZE)}</p>
                   </div>
                   <Upload onComplete={handleUploadComplete}/>
               </div>
           </div>
       </section>
      <section className="projects">
          <div className="section-inner">
              <div className="section-head">
                  <div className="copy">
                      <h2>Projects</h2>
                      <p>
                          Your latest work and shared
                          community projects all in one
                          place
                      </p>
                  </div>
              </div>

              <div className="projects-grid">
                  {projects.map(({id, name, renderedImage, sourceImage, timestamp}) => (
                      <div key={id} className="project-card group">
                      <div className="preview">
                          <img src={renderedImage || sourceImage} alt="Project"/>
                          <div className="badge">
                              <span>Community</span>
                          </div>
                      </div>
                      <div className="card-body">
                          <div>
                              <h3>{name}</h3>
                              <div className="meta">
                                  <Clock size={12} className="icon"/>
                                  <span>{new Date(timestamp).toLocaleDateString()}</span>
                                  <span>By LOGIO</span>
                              </div>
                          </div>
                          <div className="arrow">
                              <ArrowUpRight size={18}/>
                          </div>
                      </div>
                  </div>))}

              </div>
          </div>
      </section>
      </div>)
}
