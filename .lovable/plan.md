

# Corrigir dados zerados nos cartoes e adicionar modal de detalhes

## Problemas Identificados

1. **Calorias, proteina, carbs, gordura, preco e tempo aparecem como 0**: A normalizacao esta mapeando os campos, mas a IA pode estar retornando os dados em formatos inesperados (ex: strings como "350 kcal" em vez de numeros, ou campos aninhados dentro de sub-objetos).

2. **Nao existe modal de detalhes**: Ao clicar no cartao da refeicao, nao abre nenhuma tela com informacoes extras como modo de preparo, ingredientes detalhados, etc.

## Plano de Correcao

### 1. Melhorar a normalizacao de dados (`NutritionModule.tsx`)

Atualizar `normalizeAlternative` para:
- Extrair numeros de strings (ex: "350 kcal" -> 350, "R$ 4,50" -> 4.5)
- Verificar campos aninhados adicionais (ex: `raw.macros?.protein`, `raw.nutritionalInfo?.calories`)
- Garantir que `ingredients` sempre seja um array (converter string separada por virgulas se necessario)

Atualizar `normalizeMeal` para:
- Verificar se `alternatives` esta dentro de `raw.opcoes_substituicao`, `raw.substitutions`, `raw.alternativas`
- Se a IA retornar as alternativas como propriedades separadas (ex: `raw.principal`, `raw.sub1`), agrupá-las em um array

### 2. Reforcar o prompt da edge function (`nutrition-ai/index.ts`)

Adicionar instrucoes ainda mais explicitas no prompt:
- Repetir o schema JSON com tipos esperados (numeros, nao strings)
- Adicionar "NEVER use strings for numeric fields" e "ALWAYS include at least 3 alternatives per meal"
- Mover o exemplo JSON para ficar imediatamente antes do pedido de geracao

### 3. Criar modal de detalhes da refeicao (`NutritionModule.tsx`)

Adicionar um dialog/modal que aparece ao clicar no cartao da refeicao, exibindo:
- Nome da refeicao e horario
- Descricao completa
- Lista de ingredientes com quantidades
- Calorias, proteina, carbs, gordura e custo
- Tempo de preparo
- **Modo de preparo**: Adicionar campo `preparation` / `modoPreparo` na normalizacao e no prompt da IA
- Botao para fechar

O modal usara o componente Dialog ja existente no projeto (`@radix-ui/react-dialog`).

### 4. Adicionar campo "modo de preparo" ao prompt e normalizacao

- No prompt da edge function, adicionar o campo `"preparation": "Modo de preparo passo a passo"` dentro de cada alternativa
- Na `normalizeAlternative`, mapear: `raw.preparation || raw.modoPreparo || raw.modo_preparo || raw.preparo || raw.instructions || ''`
- Na interface `MealAlternative`, adicionar `preparation?: string`

## Secao Tecnica

**Arquivos modificados:**
1. `src/components/NutritionModule.tsx`:
   - Atualizar interface `MealAlternative` (adicionar `preparation`)
   - Reescrever `normalizeAlternative` com extracao numerica robusta
   - Reescrever `normalizeMeal` com mais mapeamentos
   - Adicionar estado `detailMeal` para controlar o modal
   - Adicionar componente de modal de detalhes dentro do JSX da tab "dieta"
   - Ao clicar no cartao da refeicao, abrir o modal com os dados da alternativa selecionada

2. `supabase/functions/nutrition-ai/index.ts`:
   - Adicionar `"preparation"` ao exemplo JSON do prompt
   - Adicionar instrucoes para sempre usar numeros (nao strings) nos campos de macros e custo
   - Reforcar que cada refeicao deve ter no minimo 3 alternativas

**Risco:** Baixo. Mudancas defensivas e aditivas.
