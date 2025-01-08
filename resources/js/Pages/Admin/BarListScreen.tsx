import React from "react";
import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function BarListScreen() {
    return (
        <AdminAuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Bars Dashboard
            </h2>
        }  >
        <Head title="Menu"/>
        <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                           Hello Menus
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    )
}