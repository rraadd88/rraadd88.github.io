.. _io:

==========================================
I/O
==========================================

Details about inputs and outputs of :ref:`dms2dfe`.

Inputs (configuration)
----------------------

Inputs of dms2dfe are located in `project_directory/cfg/`.
They are .csv files. Namely

.. code-block:: text

    project_directory 
    |-- cfg             : configuration directory
    |   |-- info        : csv file with variables for a particular analysis eg. number of cores, host organism etc. 
    |   |-- lbls        : csv file with samples names and corresponding paths to input files (.fastq, .sam, .bam or .mut_cds).
    |   |-- fit         : csv file with pairs of input (before selection) and selected (after selection) samples.
    |   |-- comparison  : csv file with pairs of control (eg. untreated) and test (eg. treated) samples to be compared.
    |   |-- repli       : csv file with replicates to be averaged.
    |   |-- feats       : csv file with custom features.
    |   `-- barcodes    : csv file with information about deplexing barcoded .fastq files.

info
~~~~

This csv file includes the variables for a particular analysis.
Format:

.. csv-table:: `cfg/info`
   :file: _static/io/cfg/info
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- info
    |   |   |-- column varname          : names of input variables
    |   |   |-- column input            : inputs values
    |   |   |-- column default          : default values
    |   |   `-- column description      : details of values


`info` can be edited in multiple ways as describes in :ref:`usage`.

lbls
~~~~

This is a csv file with samples names and corresponding paths to input files (.fastq, .sam, .bam or .mut_cds).
Format:

.. csv-table:: `cfg/lbls`
   :file: _static/io/cfg/lbls
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- lbls                        : samples names and corresponding paths to sequqnce files (.fastq or .bam). 
    |   |   |-- column  varname         : sample names, 
    |   |   |-- column  fhs_1           : paths to input files (.fastq or .sam or .bam or .mut_cds) 
    |   |   `-- column  fhs_2           : paths to reverse (R2) of pair ended .fastq files. 

fit
~~~~

This is a csv file with pairs of input (before selection) and selected (after selection) samples.
Format:

.. csv-table:: `cfg/fit`
   :file: _static/io/cfg/fit
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- fit                         : pairs of input (before selection) and selected (after selection) samples.
    |   |   |-- column  unsel           : sample names of input (unselected) condition, 
    |   |   `-- columns sel_1,sel_2,..  : sample names of selected condition

comparison
~~~~~~~~~~

This is a csv file with pairs of control (eg. untreated) and test (eg. treated) samples to be compared.
Format:

.. csv-table:: `cfg/comparison`
   :file: _static/io/cfg/comparison
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- comparison                  : pairs of control (eg. untreated) and test (eg. treated) samples to be compared.
    |   |   |-- column  ctrl            : sample names of control condition, 
    |   |   `-- columns test_1,test_2,..: sample names of test condition  

repli
~~~~~

This is a csv file with replicates to be averaged.
Format:

.. csv-table:: `cfg/repli`
   :file: _static/io/cfg/repli
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- repli                       : replicates to be averaged.
    |   |   |-- column  varname         : sample names of averages
    |   |   `-- columns replicate_1,replicate_2,.. : sample names of replicates

feats
~~~~~

This is a csv file with custom features.
Format:

.. csv-table:: `cfg/feats`
   :file: _static/io/cfg/feats
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- feats                       : custom features.
    |   |   |-- column  aasi            : amino acid number, 
    |   |   `-- columns feat_1,feat_2,..: features (eg. conservation score).

barcodes
~~~~~~~~

This is a csv file with information about deplexing barcoded .fastq files.
Format:

.. csv-table:: `cfg/barcodes`
   :file: _static/io/cfg/barcodes
   :header-rows: 1

Columns:

.. code-block:: text

    project_directory 
    |-- cfg
    |   |-- barcodes                    : information about deplexing barcoded .fastq files.
    |   |   |-- column  fastq_R1_fh     : paths to forward (R1) fastq files, 
    |   |   |-- column  fastq_R2_fh     : paths to reverse (R2) fastq files,
    |   |   |-- column  barcode_R1      : sequence of forward (R1) barcode,
    |   |   |-- column  barcode_R2      : sequence of reverse (R2) barcode,
    |   |   `-- column  fastq_fn        : file names of output files.

For examples of configuration files, please have a look at test datasets located in `dms2dfe/test_dataset/`.

Outputs
-------

With a successful run of `dms2dfe` following output files are created.
Below is structure of output files generated.

.. code-block:: text

    project_directory 
    |-- data_lbl	: frequencies of mutants
    |   |-- aas		: amino acid level
    |   `-- cds		: codon level
    |-- data_fit	: fitness of mutants
    |   |-- aas		: amino acid level
    |   `-- cds		: codon level
    |-- data_comparison	: comparison of fitness of mutants between test (eg. treated) and control (eg. untreated).
    |   |-- aas		: amino acid level
    |   `-- cds		: codon level
    |-- plots
    |   |-- aas		: amino acid level
    |   `-- cds		: codon level
    |-- data_ml		: data used for generating classification model.
    |-- data_feats: features generated by ana0_getfeats.

Also variants would be saves at codon levels in files with extensions .mat_mut_cds and .list_mut_cds, in the same file as sequence files (.fastq, .sam or .bam). 

data_lbl
~~~~~~~~

This includes the frequencies of mutations.
Format:

.. csv-table:: `data_lbl`
   :file: _static/io/data_lbl
   :header-rows: 1
   :stub-columns: 1

Columns:

.. code-block:: text

    project_directory 
    |-- data_lbl                                : frequencies of mutants
    |   `-- aas/cds
    |       |-- column  ref                      : Wild-type residue/nucleotide
    |       |-- column  mut                      : Mutated residue/nucleotide
    |       |-- column  mutids                   : ID of mutant <ref><index><mut>    
    |       |-- columns NiA,NiAcut,NiAcutlog    : raw, thresholded(cut) and log of counts for all(A) mutants
    |       |-- columns NiS,NiScut,NiScutlog    : raw, thresholded(cut) and log of counts for synonymous(S) mutants
    |       |-- columns NiN,NiNcut,NiNcutlog    : raw, thresholded(cut) and log of counts for non-synonymous(N) mutants
    |       `-- columns NiA_norm,NiA_tran       : normalised and transformed frequencies respectively


data_fit
~~~~~~~~

This includes the fitness of mutations.
Format:

.. csv-table:: `data_fit`
   :file: _static/io/data_fit
   :header-rows: 1
   :stub-columns: 1

.. code-block:: text

    project_directory 
    |-- data_fit                            : fitness of mutants
    |   `-- aas/cds
    |       |-- column  ref                 : Wild-type residue/nucleotide
    |       |-- column  mut                 : Mutated residue/nucleotide
    |       |-- column  mutids              : ID of mutant <ref><index><mut>   
    |       |-- column  NiA_tran.ref avg    : Average frequencies of mutants from replicates of reference (input/unselected/background) pool     
    |       |-- column  NiA_tran.ref std    : standard deviation frequencies of mutants from replicates of reference (input/unselected/background) pool     
    |       |-- column  NiA_tran.ref avg    : Average frequencies of mutants from replicates of selected (post-selection) pool     
    |       |-- column  NiA_tran.ref std    : standard deviation frequencies of mutants from replicates of selected (post-selection) pool     
    |       |-- columns FCA,FCA_norm,FiA    : Preferential enrichments (Fold changes, FC), normalised preferential enrichments and fitness(Fi) of all(A) mutants respectively
    |       |-- columns FCS,FiS             : Fold change(FC) and fitness(Fi) of synonymous(S) mutants
    |       |-- pval, stat, padj            : p-value, statistics of the test and adjusted p-value respectively.
    |       |-- 
    |       `-- column  class_fit           : class of fitness
    |           |-- value = beneficial      : if fitness(Fi) > 0  
    |           |-- value = neutral         : if fitness(Fi) = 0
    |           |-- value = deleterious     : if fitness(Fi) < 0
    |           |-- value = killed          : if not detected in selected(sel) pool
    |           `-- value = survived        : if not detected in unselected(unsel) pool

data_comparison
~~~~~~~~~~~~~~~

This includes the comparison of fitness of mutations between test and control conditions.
Format:

.. csv-table:: `data_comparison`
   :file: _static/io/data_comparison
   :header-rows: 1
   :stub-columns: 1

.. code-block:: text

    project_directory 
    |-- data_comparison                     : comparison of fitness of mutants between test (eg. treated) and control (eg. untreated).
    |   `-- aas/cds
    |       |-- column ref                  : Wild-type residue/nucleotide
    |       |-- column mut                  : Mutated residue/nucleotide
    |       |-- column mutids               : ID of mutant <ref><index><mut>    
    |       |-- columns Fi_ctrl,Fi_test    : Fitness(Fi) of all(A) mutants in control and test respectively
    |       |-- columns class_fit_ctrl,class_fit_test     : class of fitness in control and test respectively
    |       `-- column class_comparison     : class of comparison
    |           |-- value = positive        : if class_fit_ctrl ==  deleterious  & class_fit_test == beneficial
    |           |-- value = negative        : if class_fit_ctrl ==  beneficial   & class_fit_test == deleterious
    |           `-- value = robust          : if class_fit_ctrl == class_fit_test

data_feats
~~~~~~~~~~~~~~~

This includes molecular features extracted by dms2dfe modules.
Format:

.. csv-table:: `data_feats`
   :file: _static/io/data_feats
   :header-rows: 1
   :stub-columns: 1

.list_mut_cds
~~~~~~~~~~~~~

This file contains codon level read depths per mutations scored by variant caller in the form of a list.
Format:

.. csv-table:: `list_mut_cds`
   :file: _static/io/list_mut_cds
   :header-rows: 1
   :stub-columns: 1


.. code-block:: text

    list_mut_cds 
    |   |-- qry_id                  : id of query read
    |   |-- cdi                     : index of reference codon
    |   |-- cd_type                 : type of reference codon (1-64) according to index of codons located in dms2dfe.lib.global_vars
    |   |-- ref_cd                  : sequence of reference codon 
    |   `-- qry_cd                  : sequence of query (mutated) codon

.mat_mut_cds
~~~~~~~~~~~~

This file contains codon level read depths per mutations scored by variant caller in the form of mutation matrix, where reference codons are in rows and respective mutations are in columns.
Format:

.. csv-table:: `mat_mut_cds`
   :file: _static/io/mat_mut_cds
   :header-rows: 1
   :stub-columns: 1

