import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Printer, Scissors, Crop, MessageSquare } from "lucide-react";

const PricingTable = () => {
  const services = [
    {
      name: "3D Printing",
      rate: "4.50",
      unit: "hr",
      icon: <Printer className="w-6 h-6" />,
      description: "High-quality 3D printing services for your prototypes and models"
    },
    {
      name: "Large CNC",
      rate: "225",
      unit: "hr",
      icon: <Crop className="w-6 h-6" />,
      description: "Industrial-grade CNC machining for large-scale projects"
    },
    {
      name: "Large Format Printing",
      rate: "20",
      unit: "sq.ft.",
      icon: <Printer className="w-6 h-6" />,
      description: "Professional large format printing services"
    },
    {
      name: "Vinyl Cutting",
      rate: "15",
      unit: "hr",
      icon: <Scissors className="w-6 h-6" />,
      description: "Precise vinyl cutting for custom designs"
    },
    {
      name: "Desktop CNC",
      rate: "180",
      unit: "hr",
      icon: <Crop className="w-6 h-6" />,
      description: "Desktop CNC milling for smaller precision projects"
    },
    {
      name: "Laser Cutting",
      rate: "12",
      unit: "hr",
      icon: <Clock className="w-6 h-6" />,
      description: "High-precision laser cutting services"
    },
    {
      name: "Prototype Consultation",
      rate: "Free",
      unit: "",
      icon: <MessageSquare className="w-6 h-6" />,
      description: "Expert consultation for your prototype development"
    }
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.name} className="transition-all duration-300 hover:shadow-lg border border-[#5e86ca]">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-qanelas2">{service.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-qanelas3">₱
                    {typeof service.rate === 'string' ? 
                      service.rate : 
                      `$${service.rate}`}
                  </span>
                  {service.unit && (
                    <span className="text-gray-500 ml-1">/{service.unit}</span>
                  )}
                </div>
                <p className="text-gray-600 font-poppins1">{service.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;