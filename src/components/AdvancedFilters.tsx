import React, { useState, useMemo, useCallback } from 'react';
import type { User } from '../types';
import './AdvancedFilters.css';

export interface AdvancedFiltersState {
  ageRange: [number, number];
  selectedCompanies: string[];
  selectedCities: string[];
}

interface AdvancedFiltersProps {
  users: User[];
  onFiltersChange: (filters: AdvancedFiltersState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  users,
  onFiltersChange,
  isOpen,
  onToggle,
}) => {
  const [filters, setFilters] = useState<AdvancedFiltersState>({
    ageRange: [18, 80],
    selectedCompanies: [],
    selectedCities: [],
  });

  // Extract unique companies and cities from users
  const { companies, cities } = useMemo(() => {
    const companySet = new Set<string>();
    const citySet = new Set<string>();

    users.forEach(user => {
      if (user.company?.name) {
        companySet.add(user.company.name);
      }
      if (user.address?.city) {
        citySet.add(user.address.city);
      }
    });

    return {
      companies: Array.from(companySet).sort(),
      cities: Array.from(citySet).sort(),
    };
  }, [users]);

  // Update filters and notify parent
  const handleAgeChange = useCallback((min: number, max: number) => {
    const newFilters: AdvancedFiltersState = { ...filters, ageRange: [min, max] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  }, [filters, onFiltersChange]);

  const handleCompanyChange = useCallback((company: string) => {
    setFilters(prev => {
      const newCompanies = prev.selectedCompanies.includes(company)
        ? prev.selectedCompanies.filter(c => c !== company)
        : [...prev.selectedCompanies, company];
      const newFilters = { ...prev, selectedCompanies: newCompanies };
      onFiltersChange(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const handleCityChange = useCallback((city: string) => {
    setFilters(prev => {
      const newCities = prev.selectedCities.includes(city)
        ? prev.selectedCities.filter(c => c !== city)
        : [...prev.selectedCities, city];
      const newFilters = { ...prev, selectedCities: newCities };
      onFiltersChange(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const handleReset = useCallback(() => {
    const defaultFilters: AdvancedFiltersState = {
      ageRange: [18, 80],
      selectedCompanies: [],
      selectedCities: [],
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  }, [onFiltersChange]);

  return (
    <>
      <button className="filters-toggle-btn" onClick={onToggle} title="Toggle advanced filters">
        [+] Filtres avancés
      </button>

      {isOpen && (
        <div className="advanced-filters">
          <div className="filters-header">
            <h3>Filtres avancés</h3>
            <button className="close-btn" onClick={onToggle} aria-label="Close filters">
              [x]
            </button>
          </div>

          <div className="filters-content">
            {/* Age Range Slider */}
            <div className="filter-group">
              <label className="filter-label">
                Âge: {filters.ageRange[0]} - {filters.ageRange[1]} ans
              </label>
              <div className="age-sliders">
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={filters.ageRange[0]}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), filters.ageRange[1]);
                    handleAgeChange(newMin, filters.ageRange[1]);
                  }}
                  className="slider"
                />
                <input
                  type="range"
                  min="18"
                  max="80"
                  value={filters.ageRange[1]}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), filters.ageRange[0]);
                    handleAgeChange(filters.ageRange[0], newMax);
                  }}
                  className="slider"
                />
              </div>
              <div className="slider-values">
                <span className="value-label">{filters.ageRange[0]} ans</span>
                <span className="value-label">{filters.ageRange[1]} ans</span>
              </div>
            </div>

            {/* Companies Filter */}
            {companies.length > 0 && (
              <div className="filter-group">
                <label className="filter-label">Entreprises</label>
                <div className="checkbox-group">
                  {companies.slice(0, 10).map(company => (
                    <label key={company} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={filters.selectedCompanies.includes(company)}
                        onChange={() => handleCompanyChange(company)}
                      />
                      <span className="checkbox-text">{company}</span>
                    </label>
                  ))}
                  {companies.length > 10 && (
                    <span className="more-items">+{companies.length - 10} autres</span>
                  )}
                </div>
              </div>
            )}

            {/* Cities Filter */}
            {cities.length > 0 && (
              <div className="filter-group">
                <label className="filter-label">Villes</label>
                <div className="checkbox-group">
                  {cities.slice(0, 10).map(city => (
                    <label key={city} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={filters.selectedCities.includes(city)}
                        onChange={() => handleCityChange(city)}
                      />
                      <span className="checkbox-text">{city}</span>
                    </label>
                  ))}
                  {cities.length > 10 && (
                    <span className="more-items">+{cities.length - 10} autres</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="filters-footer">
            <button className="reset-btn" onClick={handleReset}>
              Réinitialiser
            </button>
            <button className="apply-btn" onClick={onToggle}>
              Appliquer
            </button>
          </div>
        </div>
      )}
    </>
  );
};
