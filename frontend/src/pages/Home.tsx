import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  Chip,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  styled,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Link
} from '@mui/material';
import { AmbienteInterface, CategoriaInterface } from '../types';
import Api from '../api/api';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  backgroundColor: 'white',
  borderRadius: 16,
  boxShadow: 'none',
  position: 'relative',
  // background: 'rgba(255, 255, 255, 0.9)',
  // backdropFilter: 'blur(20px)',
  // WebkitBackdropFilter: 'blur(20px)',
  // opacity: 0.8,
}));

const StyledChip = styled(Chip)(({ color }) => ({
  borderRadius: 16,
  sx: {
    backgroundColor: "#primary",
  },
  height: 24,
  '& .MuiChip-label': {
    paddingLeft: 8,
    paddingRight: 8,
  }
}));

const ChipColors = [
  '#2563eb',
  '#dc2626',
  '#059669',
  '#7c3aed',
  '#ea580c',
  '#0891b2',
]

const api = new Api();

export function Home() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [ambientes, setAmbientes] = useState<AmbienteInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmbiente, setSelectedAmbiente] = useState<AmbienteInterface | null>(null);
  const [Categorias, setCategorias] = useState<CategoriaInterface[] | null>([]);

  const resetCategorias = () => {
    let categorias: CategoriaInterface[] = [];
    for (const ambiente of ambientes) {
      if (ambiente.Categorias) {
        categorias.push(...ambiente.Categorias);
      }
    }
    setCategorias(categorias);
  }

  const handleTabChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue == null || newValue == "all" || parseInt(newValue, 10) == selectedAmbiente?.id) {
      setSelectedAmbiente(null)
      resetCategorias()
      setSelectedTab("all")
    } else {
      const ambiente = ambientes.find((ambiente) => ambiente.id === parseInt(newValue, 10));
      if (ambiente) {
        setSelectedAmbiente(ambiente);
        setCategorias(ambiente.Categorias || []);
      }
      setSelectedTab(newValue);
    }
  };

  useEffect(() => {
    async () => {
      const response = await api.fetchAmbientes();
      setAmbientes(response);
      let categorias: CategoriaInterface[] = [];
      response.forEach(ambiente => {
        if (ambiente.Categorias) {
          categorias.push(...ambiente.Categorias);
        }
      });
      setCategorias(categorias);
      setLoading(false);
    };

    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const fetchAndRandomize = async () => {
      const response = await api.fetchAmbientes();

      // Randomiza as subcategorias dentro de cada categoria
      const randomizedResponse = response.map(ambiente => ({
        ...ambiente,
        Categorias: ambiente.Categorias?.map(categoria => ({
          ...categoria,
          SubCategorias: categoria.SubCategorias ? shuffleArray(categoria.SubCategorias) : []
        }))
      }));

      // Randomiza as categorias dentro de cada ambiente
      const fullyRandomized = randomizedResponse.map(ambiente => ({
        ...ambiente,
        Categorias: ambiente.Categorias ? shuffleArray(ambiente.Categorias) : []
      }));

      // Randomiza a ordem dos ambientes
      const finalRandomized = shuffleArray(fullyRandomized);

      setAmbientes(finalRandomized);

      let categorias: CategoriaInterface[] = [];
      finalRandomized.forEach(ambiente => {
        if (ambiente.Categorias) {
          categorias.push(...ambiente.Categorias);
        }
      });

      setCategorias(shuffleArray(categorias));
      setLoading(false);
    };

    fetchAndRandomize();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress size={96} color="inherit" />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleTabChange}
          sx={{
            '& .MuiToggleButton-root': {
              borderRadius: 20,
              mr: 1,
              color: '#acacac',
              border: 'solid 1px #fff',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              '&.Mui-selected': {
                border: 'solid 1px #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#7a7a7a',
                '&:hover': {
                  border: 'solid 1px #fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }
            }
          }}
        >
          <ToggleButton value="all">Todos</ToggleButton>
          {ambientes.map((ambiente) => (
            <ToggleButton key={ambiente.id} value={ambiente.id}>{ambiente.nome}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {Categorias?.map((categoria, index) => (
          <Grid
            item
            md={(index + 3) % 4 === 0 ? 6 : 3}
            xs={12}
            sm={(index + 1) % 3 === 0 ? 12 : 6}
            key={index}
          >
            <StyledCard color={"yellow"}>
              <Typography variant="h6" component="h2" sx={{ fontFamily: 'serif' }}>
                {categoria.nome}
              </Typography>
              <List sx={{ height: '11rem', overflow: 'auto' }}>
                {categoria.SubCategorias?.map((subcategoria, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={subcategoria.nome} />
                    <Link href={`/subcategoria/${subcategoria.id}`}>
                      <Typography variant="caption" color="text.secondary">
                        Ler Sobre
                      </Typography>
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                {ambientes.map((ambiente) =>
                  ambiente.Categorias?.includes(categoria) && (
                    <StyledChip
                      key={ambiente.id}
                      label={ambiente.nome}
                      sx={{
                        backgroundColor: ChipColors[ambiente.id % ChipColors.length] || '#000',
                        color: '#fff'
                      }}
                    />
                  )
                )}
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}