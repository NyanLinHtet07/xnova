<?php

namespace App\Imports;

use App\Models\BarData;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class BarDataImport implements ToCollection
{
  

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {
            BarData::create([
               'name' => $row[0] ?? 'N/A',
                'address' => $row[1] ?? null,
                'opening_time' => '10AM - 11PM',
                'location_lat' => $row[2] ?? null,
                'location_long' => $row[3] ?? null,
                'category_id' => $row[4] ?? null,
                //'web' => $row[5] ?? null,
                'contact' => $row[6] ?? null,
            ]);
        }
    }
}
