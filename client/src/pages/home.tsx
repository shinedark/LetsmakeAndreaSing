import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Home() {
  const projects = [
    {
      title: "Soccer Stats Tracker",
      description: "Real-time soccer statistics and player performance analytics platform",
      technologies: ["React", "Node.js", "PostgreSQL", "WebSocket"],
      status: "Completed",
      link: "#"
    },
    {
      title: "Fantasy Football App",
      description: "Mobile fantasy football management with live scoring and player stats",
      technologies: ["React Native", "TypeScript", "Sports API"],
      status: "In Progress",
      link: "#"
    },
    {
      title: "Match Analysis Dashboard",
      description: "Interactive dashboard for analyzing team performance and tactics",
      technologies: ["D3.js", "Python", "FastAPI", "MongoDB"],
      status: "Completed",
      link: "#"
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", 
    "MongoDB", "AWS", "Docker", "Git", "Figma", "Agile"
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Andrea Sing</h1>
              <p className="text-muted-foreground mt-1">Full-Stack Developer & Creative Technologist</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <img 
                src="/images/pirlo.jpg" 
                alt="Andrea Pirlo - Soccer Legend" 
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary shadow-lg"
              />
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Building Digital Experiences
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I'm a passionate full-stack developer who loves creating beautiful, 
              functional applications that solve real-world problems. With expertise 
              in modern web technologies and a keen eye for design. Inspired by the 
              elegance and precision of soccer legends like Andrea Pirlo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.slice(0, 6).map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-muted-foreground mb-4">
                    I'm a creative developer with 5+ years of experience building 
                    web applications and digital solutions. I specialize in creating 
                    user-centered designs and robust backend systems.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or hiking in the mountains.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-sm text-muted-foreground">
                      Computer Science, University of Technology
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      San Francisco, CA
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Available for</h4>
                    <p className="text-sm text-muted-foreground">
                      Freelance projects and full-time opportunities
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : "secondary"}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "Figma"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Tools & Others</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "AWS", "Vercel", "Jest", "Agile", "Scrum"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Let's Work Together</CardTitle>
              <CardDescription className="text-center">
                I'm always interested in new opportunities and exciting projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Ready to bring your ideas to life? Let's discuss how we can work together.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    View My Work
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">© 2024 Andrea Sing. All rights reserved.</p>
            <p className="text-sm">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}