import { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Container,
    Collapse,
    Paper,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { AmbienteInterface } from '../types';
import Api from '../api/api';

const api = new Api();

export const Dashboard = () => {
    const theme = useTheme();
    const [ambientes, setAmbientes] = useState<AmbienteInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAmbiente, setNewAmbiente] = useState<string>('');
    const [newCategoria, setNewCategoria] = useState<string>('');
    const [newSubCategoria, setNewSubCategoria] = useState<string>('');
    const [expandedAmbiente, setExpandedAmbiente] = useState<number | null>(null);
    const [expandedCategoria, setExpandedCategoria] = useState<number | null>(null);
    // const [selectedAmbienteId, setSelectedAmbienteId] = useState<number | null>(null);
    // const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(null);

    // Estados para edição
    const [editMode, setEditMode] = useState<{
        type: 'ambiente' | 'categoria' | 'subcategoria' | null;
        id: number | null;
        nome: string;
    }>({ type: null, id: null, nome: '' });

    // Estados para confirmação de delete
    const [deleteConfirm, setDeleteConfirm] = useState<{
        type: 'ambiente' | 'categoria' | 'subcategoria' | null;
        id: number | null;
        nome: string;
    }>({ type: null, id: null, nome: '' });

    useEffect(() => {
        fetchAmbientes();
    }, []);

    const fetchAmbientes = async () => {
        try {
            const response = await api.fetchAmbientes();
            console.log(response);
            setAmbientes(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ambientes:', error);
            setLoading(false);
        }
    };

    const handleCreateAmbiente = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Renderização otimista para ambiente
            let updatedAmbientes: AmbienteInterface[] = [];
            updatedAmbientes = [...ambientes, { id: 0, nome: newAmbiente, descricao: null, createdAt: new Date(), updatedAt: new Date() }];
            setAmbientes(updatedAmbientes);
            await api.createAmbiente({ nome: newAmbiente });
            setNewAmbiente('');
            fetchAmbientes();
        } catch (error) {
            console.error('Error creating ambiente:', error);
        }
    };

    const handleCreateCategoria = async (ambienteId: number) => {
        try {
            // Renderização otimista para categoria
            let updatedAmbientes: AmbienteInterface[] = [];
            updatedAmbientes = ambientes.map(amb => ({
                ...amb,
                Categorias: amb.Categorias?.map(cat =>
                    cat.id === ambienteId ? { ...cat, SubCategorias: [...(cat.SubCategorias || []), { id: 0, nome: newCategoria, descricao: null, categoriaId: ambienteId, createdAt: new Date(), updatedAt: new Date() }] } : cat
                )
            }));
            setAmbientes(updatedAmbientes);
            await api.createCategoria({ nome: newCategoria, ambienteId });
            setNewCategoria('');
            fetchAmbientes();
        } catch (error) {
            console.error('Error creating categoria:', error);
        }
    };

    const handleCreateSubCategoria = async (categoriaId: number) => {
        try {
            // Renderização otimista para subcategoria
            let updatedAmbientes: AmbienteInterface[] = [];
            updatedAmbientes = ambientes.map(amb => ({
                ...amb,
                Categorias: amb.Categorias?.map(cat =>
                    cat.id === categoriaId ? { ...cat, SubCategorias: [...(cat.SubCategorias || []), { id: 0, nome: newSubCategoria, descricao: null, categoriaId, createdAt: new Date(), updatedAt: new Date() }] } : cat
                )
            }));
            setAmbientes(updatedAmbientes);
            await api.createSubCategoria({ nome: newSubCategoria, categoriaId });
            setNewSubCategoria('');
            fetchAmbientes();
        } catch (error) {
            console.error('Error creating subcategoria:', error);
        }
    };

    // Funções de delete
    const handleDeleteAmbiente = async (id: number) => {
        try {
            await api.deleteAmbiente(id);
            setDeleteConfirm({ type: null, id: null, nome: '' });
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting ambiente:', error);
        }
    };

    const handleDeleteCategoria = async (id: number) => {
        try {
            await api.deleteCategoria(id);
            setDeleteConfirm({ type: null, id: null, nome: '' });
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    const handleDeleteSubCategoria = async (id: number) => {
        try {
            await api.deleteSubCategoria(id);
            setDeleteConfirm({ type: null, id: null, nome: '' });
            fetchAmbientes();
        } catch (error) {
            console.error('Error deleting subcategoria:', error);
        }
    };

    // Funções de edição
    const handleEdit = async () => {
        try {
            if (!editMode.id || !editMode.type) return;

            let updatedAmbientes: AmbienteInterface[] = [];

            switch (editMode.type) {
                case 'ambiente':
                    // Atualização otimista para ambiente
                    updatedAmbientes = ambientes.map(amb => ({
                        ...amb,
                        nome: amb.id === editMode.id ? editMode.nome : amb.nome
                    }));
                    setAmbientes(updatedAmbientes);
                    await api.updateAmbiente({ nome: editMode.nome }, editMode.id);
                    break;
                case 'categoria':
                    // Atualização otimista para categoria
                    updatedAmbientes = ambientes.map(amb => ({
                        ...amb,
                        Categorias: amb.Categorias?.map(cat =>
                            cat.id === editMode.id
                                ? { ...cat, nome: editMode.nome }
                                : cat
                        )
                    }));
                    setAmbientes(updatedAmbientes);
                    await api.updateCategoria({ nome: editMode.nome }, editMode.id);
                    break;
                case 'subcategoria':
                    // Atualização otimista para subcategoria
                    updatedAmbientes = ambientes.map(amb => ({
                        ...amb,
                        Categorias: amb.Categorias?.map(cat =>
                            cat.id === editMode.id
                                ? { ...cat, nome: editMode.nome }
                                : cat
                        )
                    }));
                    await api.updateSubCategoria({ nome: editMode.nome }, editMode.id);
                    break;
            }

            setEditMode({ type: null, id: null, nome: '' });
            fetchAmbientes();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Gestão de Ambientes
            </Typography>

            <Box component="form" onSubmit={handleCreateAmbiente} sx={{ mb: 4 }}>
                <TextField
                    label="Novo Ambiente"
                    value={newAmbiente}
                    onChange={(e) => setNewAmbiente(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                    Adicionar Ambiente
                </Button>
            </Box>

            <List>
                {ambientes.map((ambiente) => (
                    <Paper key={ambiente.id} elevation={2} sx={{ mb: 2 }}>
                        <ListItem
                            button
                            onClick={() => setExpandedAmbiente(expandedAmbiente === ambiente.id ? null : ambiente.id)}
                        >
                            <ListItemText
                                primary={ambiente.nome}
                                sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditMode({ type: 'ambiente', id: ambiente.id, nome: ambiente.nome });
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteConfirm({ type: 'ambiente', id: ambiente.id, nome: ambiente.nome });
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                {expandedAmbiente === ambiente.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Collapse in={expandedAmbiente === ambiente.id}>
                            <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <TextField
                                        label="Nova Categoria"
                                        value={newCategoria}
                                        onChange={(e) => setNewCategoria(e.target.value)}
                                        size="small"
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleCreateCategoria(ambiente.id)}
                                        startIcon={<AddIcon />}
                                    >
                                        Adicionar Categoria
                                    </Button>
                                </Box>
                                <List>
                                    {ambiente.Categorias?.map((categoria) => (
                                        <Paper key={categoria.id} elevation={1} sx={{ mb: 1 }}>
                                            <ListItem
                                                button
                                                onClick={() => setExpandedCategoria(expandedCategoria === categoria.id ? null : categoria.id)}
                                            >
                                                <ListItemText primary={categoria.nome} />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEditMode({ type: 'categoria', id: categoria.id, nome: categoria.nome });
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeleteConfirm({ type: 'categoria', id: categoria.id, nome: categoria.nome });
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    {expandedCategoria === categoria.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </ListItemSecondaryAction>
                                            </ListItem>

                                            <Collapse in={expandedCategoria === categoria.id}>
                                                <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                                                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                        <TextField
                                                            label="Nova Subcategoria"
                                                            value={newSubCategoria}
                                                            onChange={(e) => setNewSubCategoria(e.target.value)}
                                                            size="small"
                                                        />
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => handleCreateSubCategoria(categoria.id)}
                                                            startIcon={<AddIcon />}
                                                        >
                                                            Adicionar Subcategoria
                                                        </Button>
                                                    </Box>

                                                    <List>
                                                        {categoria.SubCategorias?.map((subcategoria) => (
                                                            <ListItem key={subcategoria.id}>
                                                                <ListItemText primary={subcategoria.nome} />
                                                                <ListItemSecondaryAction>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => setEditMode({
                                                                            type: 'subcategoria',
                                                                            id: subcategoria.id,
                                                                            nome: subcategoria.nome
                                                                        })}
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => setDeleteConfirm({
                                                                            type: 'subcategoria',
                                                                            id: subcategoria.id,
                                                                            nome: subcategoria.nome
                                                                        })}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Box>
                                            </Collapse>
                                        </Paper>
                                    ))}
                                </List>
                            </Box>
                        </Collapse>
                    </Paper>
                ))}
            </List>

            {/* Modal de Edição */}
            <Dialog open={!!editMode.type} onClose={() => setEditMode({ type: null, id: null, nome: '' })}>
                <DialogTitle>
                    Editar {editMode.type === 'ambiente' ? 'Ambiente' :
                        editMode.type === 'categoria' ? 'Categoria' : 'Subcategoria'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        type="text"
                        fullWidth
                        value={editMode.nome}
                        onChange={(e) => setEditMode({ ...editMode, nome: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditMode({ type: null, id: null, nome: '' })}>Cancelar</Button>
                    <Button onClick={handleEdit} variant="contained">Salvar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmação de Delete */}
            <Dialog
                open={!!deleteConfirm.type}
                onClose={() => setDeleteConfirm({ type: null, id: null, nome: '' })}
            >
                <DialogTitle>Confirmar exclusão</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir {deleteConfirm.type === 'ambiente' ? 'o ambiente' :
                            deleteConfirm.type === 'categoria' ? 'a categoria' :
                                'a subcategoria'} "{deleteConfirm.nome}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirm({ type: null, id: null, nome: '' })}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => {
                            if (!deleteConfirm.id) return;
                            switch (deleteConfirm.type) {
                                case 'ambiente':
                                    handleDeleteAmbiente(deleteConfirm.id);
                                    break;
                                case 'categoria':
                                    handleDeleteCategoria(deleteConfirm.id);
                                    break;
                                case 'subcategoria':
                                    handleDeleteSubCategoria(deleteConfirm.id);
                                    break;
                            }
                        }}
                        color="error"
                        variant="contained"
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}; 