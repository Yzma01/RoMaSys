import React from 'react'
import FilterIncomingChart from './FilterIncomingChart'
import { DatePickerWithRange } from '../ui/DateSelector'

const FilterBar = () => {
  return (
    <div className='flex flex-row border border-gray-500 bg-adminBackground'>
        <DatePickerWithRange className={"text-gray-300 font-bold"}/>
        
        <FilterIncomingChart />
    </div>
  )
}

export default FilterBar