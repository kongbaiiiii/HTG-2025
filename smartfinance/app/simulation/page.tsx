"use client"

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Slider, 
  Card, 
  CardContent,
  Avatar,
  LinearProgress,
  IconButton
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CasinoIcon from '@mui/icons-material/Casino';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const FinancialSimulation = () => {
  // Game state
  const [money, setMoney] = useState(1000);
  const [day, setDay] = useState(1);
  const [happiness, setHappiness] = useState(80);
  const [skills, setSkills] = useState(10);
  
  // Investment options (placeholder data)
  const investments = [
    { id: 1, name: "Tech Stocks", risk: "High", returnRate: "8-15%", minInvestment: 500 },
    { id: 2, name: "Savings Account", risk: "Low", returnRate: "1-2%", minInvestment: 100 },
    { id: 3, name: "Crypto", risk: "Very High", returnRate: "-20% to +40%", minInvestment: 200 },
    { id: 4, name: "Real Estate", risk: "Medium", returnRate: "4-7%", minInvestment: 1000 },
  ];

  // Career options
  const careers = [
    { id: 1, name: "Software Developer", salary: 100, skillsRequired: 20 },
    { id: 2, name: "Financial Analyst", salary: 90, skillsRequired: 25 },
    { id: 3, name: "Entrepreneur", salary: "Variable", skillsRequired: 30 },
  ];

  // Advance to next day
  const advanceDay = () => {
    setDay(day + 1);
    // Here you would calculate investment returns, salary, etc.
    // For now just add a placeholder amount
    setMoney(money + 50);
    setHappiness(Math.max(0, Math.min(100, happiness - 5 + Math.random() * 10)));
  };

  // Learn new skills
  const learnSkills = () => {
    setSkills(skills + 5);
    setMoney(money - 100);
    setHappiness(happiness - 10);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontFamily: 'Monospace', color: '#2e7d32' }}>
        Financial Fortune Simulator 💰
      </Typography>
      
      {/* Player Stats */}
      <Paper elevation={3} sx={{ p: 2, mb: 3, background: 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <AttachMoneyIcon sx={{ mr: 1, color: 'green' }} />
              <Typography variant="h6">Cash: ${money.toLocaleString()}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <TrendingUpIcon sx={{ mr: 1, color: 'blue' }} />
              <Typography variant="h6">Day: {day}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1">Happiness</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>😢</Typography>
              <LinearProgress 
                variant="determinate" 
                value={happiness} 
                sx={{ width: '70%', height: 10, borderRadius: 5 }} 
                color="success"
              />
              <Typography variant="body2" sx={{ ml: 1 }}>😄</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1">Skills: {skills}</Typography>
            <LinearProgress 
              variant="determinate" 
              value={skills} 
              sx={{ width: '80%', height: 10, borderRadius: 5 }} 
              color="primary"
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Main Game Area */}
      <Grid container spacing={3}>
        {/* Investments Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', background: 'linear-gradient(45deg, #e8f5e9 30%, #c8e6c9 90%)' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CasinoIcon sx={{ mr: 1 }} /> Investments
            </Typography>
            <Grid container spacing={2}>
              {investments.map((investment) => (
                <Grid item xs={12} sm={6} key={investment.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="primary">{investment.name}</Typography>
                      <Typography variant="body2">Risk: {investment.risk}</Typography>
                      <Typography variant="body2">Return: {investment.returnRate}</Typography>
                      <Typography variant="body2">Min: ${investment.minInvestment}</Typography>
                      <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ mt: 1 }}
                        disabled={money < investment.minInvestment}
                      >
                        Invest
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        {/* Career Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', background: 'linear-gradient(45deg, #fff3e0 30%, #ffe0b2 90%)' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon sx={{ mr: 1 }} /> Career
            </Typography>
            <Grid container spacing={2}>
              {careers.map((career) => (
                <Grid item xs={12} key={career.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h6" color="primary">{career.name}</Typography>
                          <Typography variant="body2">Salary: ${career.salary}/day</Typography>
                          <Typography variant="body2">Skills Required: {career.skillsRequired}</Typography>
                        </Box>
                        <Button 
                          variant="contained" 
                          color="secondary"
                          disabled={skills < career.skillsRequired}
                        >
                          Apply
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SchoolIcon />}
                  onClick={learnSkills}
                  disabled={money < 100}
                  fullWidth
                >
                  Learn New Skills ($100)
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Random Events Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)' }}>
            <Typography variant="h5" gutterBottom>Recent Events</Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              No recent events. Play more days to experience random financial events!
            </Typography>
          </Paper>
        </Grid>
        
        {/* Game Controls */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={advanceDay}
              sx={{ 
                px: 4, 
                py: 1.5, 
                borderRadius: 28,
                background: 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
                boxShadow: '0 3px 5px 2px rgba(46, 125, 50, .3)'
              }}
            >
              Advance to Next Day
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinancialSimulation;
