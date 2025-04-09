import React, { useState, useEffect, useRef } from 'react';
import Cat from "../assets/cat.jpg"
import Dog from "../assets/dog.jpg"
import Turtle from "../assets/turtle.jpg"
import Fish from "../assets/fish.jpg"
import Hamster from "../assets/hamsters.jpg"
import Lizard from "../assets/lizard.jpg"
import Horse from "../assets/horse.jpg"
import Parrot from "../assets/parrot.jpg"
import Bird from "../assets/bird.jpg"

export const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Emma Wilson',
      role: 'Chief Veterinarian',
      description: 'With over 15 years of experience, Dr. Wilson oversees all health-related aspects of our pet inventory.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Animal Behaviorist',
      description: 'Michael ensures our pets are well-socialized and ready for their forever homes.'
    },
    {
      name: 'Sarah Chen',
      role: 'Customer Relations',
      description: 'Sarah helps match the perfect pet with the right family for lasting happiness.'
    }
  ];

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-5xl text-center space-y-16">
        
        {/* Mission */}
        <section>
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6 py-5">Our Mission</h1>
          <p className="text-gray-700 px-6 py-6 rounded-xl border border-gray-300 bg-white shadow">
            At PetSphere, we enable simple yet effective pet inventory management for pet stores. Our passion for animals drives us to provide a platform that connects pet lovers with their perfect companions. We believe in responsible pet ownership and aim to educate our users on the best practices for caring for their pets.
          </p>
        </section>

        {/* Animals */}
        <section className="w-full overflow-hidden">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6 py-5 text-center">The Animals We Work With</h2>

          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 animate-slide whitespace-nowrap">
              {[
                Cat, Dog, Turtle, Fish, Parrot, Horse, Lizard, Hamster, Bird, 
                Cat, Dog, Turtle, Fish
              ].map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`animal-${index}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full border-2 border-gray-300 shadow transition-transform hover:scale-105 inline-block"
                />
              ))}
            </div>
          </div>
        </section>



        {/* Team */}
        <section>
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6 py-5">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 w-72 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
