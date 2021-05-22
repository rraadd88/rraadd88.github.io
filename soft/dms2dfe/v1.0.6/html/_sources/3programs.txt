.. _programs:

==========================================
Programs
==========================================

Front-end programs of `dms2dfe`
===============================

.. autosummary:: 
 :toctree: generated
  
    dms2dfe.pipeline.main
    dms2dfe.configure.main
    dms2dfe.ana0_fastq2dplx.main
    dms2dfe.ana0_fastq2sbam.main
    dms2dfe.ana0_getfeats.main
    dms2dfe.ana1_sam2mutmat.main
    dms2dfe.ana2_mutmat2fit.main
    dms2dfe.ana4_modeller.main
    dms2dfe.ana3_fit2comparison.main
    dms2dfe.ana4_plotter.main
    
**Parameters:** **prj_dh** - name of project_directory.
**Parameters:** **test** - switch to debug mode.

**--step 0.1** : Demuliplex `.fastq` files
=========================================================

If barcodes are detected in the configuration (located at `project_directory/cfg/barcodes`), `.fastq` files are demultiplexed accordingly. 

**--step 0.2** : Preprocesses and aligns sequencing files
=========================================================

The steps and required dependendencies:

.. code-block:: text

    Quality filtering        : Trimmomatic.
    Alignment                : bowtie2
    .sam to .bam conversion  : samtools


**--step 0.3** : Extracts molecular features
=========================================================

This optional module extracts following structural features of reference protein.

The out files are created in prj_dh/data_feats

The steps and required dependendencies are following.

.. code-block:: text

    Secondary structure                      : using DSSP.
    Solvent Accessible Surface Area          : using DSSP.  
    Distance of a residue from reference atom: using Bio.PDB

**--step 1** : Variant calling
=========================================================

Alignment files (sorted bam) are used to produce codon level mutation matrix of counts of mutants.

**--step 2** : Estimation of fitness scores
======================================================

Since DMS studies are primarily based on competition assays, the preferential enrichment of a particular mutant with respect to other can be best described in terms of fitness changes.
The fitness could be interpreted into the functional importance at molecular level of the RNA and protein which eventually translate into organismal fitness.
In `dms2dfe` workflow, Fitness is calculated from a fold change of frequencies of mutants in selected sample with respect to unselected sample.

.. math::

    \begin{equation}
    FC_{i} = \log_{2}\left [ \frac{N_{i,sel}}{N_{i,unsel}} \right ] 
    \end{equation}

where FC\ :sub:`i` is preferential enrichment (fold change) score, N\ :sub:`i,sel` and N\ :sub:`i,unsel` are frequencies of mutant i\ :sup:`th` in selected and unselected conditions respectively.

This fold change value is dependent on the seqencing depths of the two samples. 
So to eliminate this factor, following two strategies are implemented in `dms2dfe`.

Normalization of fold change values with respect to frequencies of synonymous mutations
----------------------------------------------------------------

With the conventional methods used for generation of mutation libraries such as using degenerate codon NNK or NNS - alongside non-synonymous mutations, a proportion of synonymous mutations are cloned.
Synonymous mutations can be considered are fairly invariable in terms of their fold change values since they express into the same (wild-type) sequence hence can be used as a normalizing factor.
In other words, since their functional importance would be conserved and equal to wild type allele, fold changes of synonymous mutations can be used benchmark fitness of wild type.
From detected synonymous mutations, a maximum likelihood estimate of the gaussian fitted distribution of their fold changes is used as a normalizing factor. 
A Z-score is calculated from the fold changes employing population mean and standard deviation from the normalizing factor as described in Supplementary Material.

.. math::

    \begin{equation}\label{eq:solve}
    FC_{i,normalized}=\frac{FC_{i}-\mu_{syn}}{\sigma_{syn}}
    \end{equation}

where FC\ :sub:`i,normalized` is Z-score normalized preferential enrichment (Fold change) of i\ :sup:`th` mutant. mu\ :sub:`syn` and sigma\ :sub:`syn` are a population mean and standard deviation of Gaussian fitted distribution of fold changes of wild type (synonymous) mutants respectively.

Normalization of fold change values with respect to frequencies of wild type
----------------------------------------------------------------

Alternatively, normalization can also be carried out with respect to wild type alleles as described by Melnikov et. al. [@Melnikov2014]. 
This approach is especially useful in scenarios where synonymous mutants are not generated through the library cloning method used.

.. math::

    \begin{equation}
    FC_{i,normalized} = FC_{i} - FC_{i,wild}
    \end{equation}

where FC\ :sub:`i,normalized` and FC\ :sub:`i` are normalized preferential enrichment (Fold change), non-normalized fold change of i\ :sup:`th` mutant. 
FC\ :sub:`i,wild` fold change of wild type amino acids at that position.

Normalization with respect to synonymous mutations is sensitive to changes in coverage across the length of reference sequence which is especially the case in shot gun sequencing methods eg. tagmentation based library preparations.
To account for this, the both methods can be used in tandem with synonymous mutation for better normalization.

Rescaling preferential enrichments with respect to the synonymous mutants

----------------------------------------------------------------

To reflect the relative fitness with respact to the wild type allele, preferential enrichments are rescaled with respect to preferential enrichments of the wild type allele. 

.. math::

    \begin{equation}
    F_{i} = FC_{i} - FC_{i,wild}
    \end{equation}

where F\ :sub:`i` and FC\ :sub:`i` are fitness score, preferential enrichment of of $i^{th}$ mutant.  
FC\ :sub:`i` is the fold change of wild type sequences at that position.

Classification of mutants based on fitness values
----------------------------------------------------------------

Since the fitness values are scaled based on wild type alleles, the mutants can be classified as deleterious (if F\ :sub:`i` < 0) and beneficial (if F\ :sub:`i` > 0) as follows,

.. math::

    \begin{equation}
    M_{i} \in \left \{\begin{matrix}
    deleterious  & if \  F_i<0 \\ 
    beneficial  & if \ F_i>0
    \end{matrix}\right.
    \end{equation}

where, M\ :sub:`i` is i\ :sup:`th` kind of survived mutant.

**--step 3** : Identifies important molecular features
======================================================

Correlative analysis is carried out to identify molecular features that strongly correlate with fitness scores.
Features extracted in upstream step are utilized here.

Correlation plots are saved in `project_directory/plots/` directory with a suffix `.corr.pdf`.

**--step 4** : Comparisons across conditions
======================================================

Based on the categoris of fitness of mutants in test and control experimental conditions, mutants are classified in three categories `positive`, `negative` and `robust`.

.. math::

    \begin{equation}
    M_{i,test} \in \left \{\begin{matrix}
    positive & if \ (M_{i,control} \in deleterious \ and \ M_{i,test} \in beneficial)\\
    negative & if \ (M_{i,control} \in beneficial \ and \ M_{i,test} \in deleterious)\\
    robust & else
    \end{matrix}\right.
    \end{equation}

where M\ :sub:`i,test` and M\ :sub:`i,control` are i\ :sup:`th` kind of survived mutant in test and control libraries respectively.

This categorization simplifies the data in terms of overall dynamics of DFEs.

**--step 5** : Visualizations
======================================================

Visualizations generated by visualization step and respective extentions. These plots are saved in the `project_directory/plot/aas`.

.. code-block:: text

    *. Coverage/depth of sequencing : `.coverage.pdf` 
    *. Mutation matrix (heatmap): `.mutmap.pdf`
    *. Substitution matrix (heatmap): `.submap.pdf`
    *. Scatter plot between counts of selected and reference mutants : `.multisca.pdf`
    *. Projections on PDB: `.pdb.png` (`.pdb`)

