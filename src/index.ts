import express from 'express';
import Server from './server';

new Server(express(), 3333).turnOn();
