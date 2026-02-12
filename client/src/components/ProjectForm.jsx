import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({
    data, 
    onChange
}) => {
    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: ''
        }
        onChange([...data, newProject])
    }
    const removeProject = (index) => {
        const updated = data.filter((_,i) => i !== index)
        onChange(updated)
    }
    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = {...updated[index], [field]:value}
        onChange(updated)
    }
  return (
    <div>
        <div className="flex items-center justify-between">
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects</h3>
                <p className='text-sm text-gray-500'>Add your projects</p>
            </div>
            <button onClick={addProject} className='flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors disabled:opacity-50'>
                <Plus className='size-4'/>
                <span>Add Project</span>
            </button>
        </div>

        
            <div className='space-y-4' >
                {data.map((project, index) => (
                    <div key={index} className='border p-4 border-gray-200 rounded-lg space-y-3'>
                        <div className="flex justify-between items-start">
                            <h4>Project #{index+1}</h4>
                            <button onClick={()=>removeProject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-4'/>
                            </button>
                        </div>
                        <div className="grid gap-3">
                            {/* Input fields...  */}
                            <input type="text" className='py-2 px-3 text-sm rounded-lg' value={project.name || ''} onChange={(e)=>updateProject(index, "name",e.target.value)} placeholder='Project Name'/>
                            <input type="text" className='py-2 px-3 text-sm rounded-lg' value={project.type || ''} onChange={(e)=>updateProject(index, "type",e.target.value)} placeholder="Project Type"/>
                            <textarea rows={4} className='w-full py-2 px-3 text-sm rounded-lg' value={project.description || ''} onChange={(e)=>updateProject(index, "description",e.target.value)} placeholder='Describe your project...'/>
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        
    </div>
  )
}

export default ProjectForm