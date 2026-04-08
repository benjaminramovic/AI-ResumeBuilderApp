import { Loader, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

const ProfessionalSummaryForm = ({
    data,
    onChange,
    setResumeData
}) => {
    const [isGenerating, setIsGenerating] =useState(false)
    const {token} = useSelector(state => state.auth)

    const enhanceSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `enhance my professional summary "${data}"`

            const resp = await api.post("/api/ai/enhance-pro-sum", {userContent: prompt}, {headers: {
                Authorization: token
            }})
            setResumeData(prev => ({...prev, professional_summary: resp.data.enhancedContent}))

        }catch(error){
            toast.error(error.message)
        }
        finally {
            setIsGenerating(false)
        }
    }
  return (
    <div className='space-y-4'>
        <div className="flex items-center justify-between">
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                <p className='text-sm text-gray-500'>Add summary to your resume here</p>
            </div>
            <button disabled={isGenerating}
            onClick={enhanceSummary}
            className='flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded hover:Bg-purple-200 transition-colors disabled:opacity-50'>
                {isGenerating ? (<Loader className='size-4 animate-spin' />) : (<Sparkles className='size-4'/>)}
                <span>{isGenerating ? 'Enhancing...' : 'AI Enhance'}</span>
            </button>
        </div>
        <div className='mt-6'>
            <textarea
            className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
            placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
            rows={7} value={data || ""} onChange={(e)=>onChange(e.target.value)}/>
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
        </div>

    </div>
  )
}

export default ProfessionalSummaryForm